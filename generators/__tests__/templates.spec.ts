/**
 * Renders every generator template against a sample entity and runs Biome over
 * the result. Templates are Handlebars, so a stray `{{` in JSX or a `}}` right
 * after a triple-stash only surfaces as a parse error at generation time —
 * this turns that into something `pnpm test` catches up front.
 *
 * Two names are checked on purpose: a short one and a long one, because line
 * wrapping is the other thing that varies with entity name.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Handlebars from 'handlebars';
import { describe, expect, it } from 'vitest';

import { resolveData } from '../_lib/prompts.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
// This spec lives in `generators/__tests__`, so the generators folder is one
// level up and the repo root two.
const templatesDir = path.resolve(here, '..');
const repoRoot = path.resolve(here, '../..');

const SAMPLE_NAMES = ['job', 'purchase-order'];
const TS_EXTENSIONS = new Set(['.ts', '.tsx']);

function collectTemplates(dir: string): string[] {
  const found: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      found.push(...collectTemplates(full));
    } else if (entry.name.endsWith('.hbs')) {
      found.push(full);
    }
  }

  return found.sort();
}

describe('generator templates', () => {
  const templates = collectTemplates(templatesDir);

  it('finds templates', () => {
    expect(templates.length).toBeGreaterThan(0);
  });

  describe.each(SAMPLE_NAMES)('renders for "%s"', (entityName) => {
    // The exact object a generator hands to Handlebars, so this covers the
    // naming layer and everything `resolveData` adds on top of it.
    const data = resolveData({ entityName, feature: '' });

    it.each(templates)('%s', (templatePath) => {
      const source = fs.readFileSync(templatePath, 'utf8');

      // Every identifier a template interpolates must exist in the naming layer.
      // Handlebars resolves unknown names to an empty string, which compiles fine
      // and produces a module with broken imports instead of a clear failure.
      const referenced = [
        ...source.matchAll(/\{\{\{?\s*([A-Za-z_][\w]*)\s*\}?\}\}/g),
      ].map((match) => match[1]);

      for (const name of new Set(referenced)) {
        expect(
          Object.hasOwn(data, name),
          `${path.relative(repoRoot, templatePath)} references "${name}", which buildNaming() does not produce`
        ).toBe(true);
      }

      let rendered: string;
      try {
        rendered = Handlebars.compile(source)(data);
      } catch (error) {
        throw new Error(
          `Failed to render ${path.relative(repoRoot, templatePath)}: ${(error as Error).message}`
        );
      }

      // A leftover `{{name}}` means the template references something the
      // naming layer never produces. A bare `}}` is not a signal — legitimate
      // JSX like `onRowAction={(id) => { ... }}` ends in one.
      expect(rendered).not.toMatch(/\{\{\s*[A-Za-z]/);

      if (!TS_EXTENSIONS.has(path.extname(templatePath).slice(0, -4))) {
        return;
      }

      const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gen-tpl-'));
      const outFile = path.join(outDir, path.basename(templatePath, '.hbs'));

      try {
        fs.writeFileSync(outFile, rendered);

        try {
          execFileSync(
            path.join(repoRoot, 'node_modules/.bin/biome'),
            ['check', '--write', '--no-errors-on-unmatched', outFile],
            { stdio: 'pipe' }
          );
        } catch (error) {
          throw new Error(
            `${path.relative(repoRoot, templatePath)} produced invalid code:\n${
              (error as { stderr?: Buffer }).stderr?.toString() ??
              (error as Error).message
            }`
          );
        }
      } finally {
        fs.rmSync(outDir, { force: true, recursive: true });
      }
    });
  });
});
