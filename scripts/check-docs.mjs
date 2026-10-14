#!/usr/bin/env node

/**
 * Validates documentation across the project:
 * 1. Internal markdown links and relative file paths exist.
 * 2. Fragment anchors (#heading-slug) resolve to headings in the target markdown file.
 * 3. Exact code file paths referenced in backticks exist on disk.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const EXCLUDED_DIRS = new Set(['node_modules', '.git', 'dist', '.turbo']);

function getMarkdownFiles(dir) {
  let files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory might not exist or be accessible
  }
  return files;
}

function slugify(text) {
  return text
    .replace(/^#+\s*/, '')
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function getAnchors(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const headers = content.split('\n').filter((l) => l.startsWith('#'));
    return new Set(headers.map(slugify));
  } catch {
    return new Set();
  }
}

function run() {
  const mdFiles = [
    ...getMarkdownFiles(path.join(ROOT_DIR, '.agents')),
    ...getMarkdownFiles(path.join(ROOT_DIR, 'src')),
    ...fs
      .readdirSync(ROOT_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => path.join(ROOT_DIR, f)),
  ];

  const errors = [];
  const anchorCache = new Map();

  const getCachedAnchors = (targetPath) => {
    if (!anchorCache.has(targetPath)) {
      anchorCache.set(targetPath, getAnchors(targetPath));
    }
    return anchorCache.get(targetPath);
  };

  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const backtickPathRegex =
    /`((?:src|public|scripts|\.agents)\/[a-zA-Z0-9_\-./]+)`/g;

  for (const filePath of mdFiles) {
    const relFile = path.relative(ROOT_DIR, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const dir = path.dirname(filePath);

    // 1. Check markdown links [text](target)
    for (const match of content.matchAll(mdLinkRegex)) {
      const rawTarget = match[2].trim();
      if (/^(https?:|mailto:)/.test(rawTarget)) continue;

      const [targetFile, anchor] = rawTarget.split('#');

      let resolvedFile = filePath;
      if (targetFile) {
        const relTarget = path.resolve(dir, targetFile);
        const rootTarget = path.resolve(
          ROOT_DIR,
          targetFile.replace(/^\//, '')
        );

        if (fs.existsSync(relTarget)) {
          resolvedFile = relTarget;
        } else if (fs.existsSync(rootTarget)) {
          resolvedFile = rootTarget;
        } else {
          errors.push(
            `[Broken Link Target] ${relFile}: "[${match[1]}](${rawTarget})" -> Target file not found: "${targetFile}"`
          );
          continue;
        }
      }

      if (anchor) {
        const anchors = getCachedAnchors(resolvedFile);
        if (!anchors.has(anchor.toLowerCase())) {
          const relResolved = path.relative(ROOT_DIR, resolvedFile);
          errors.push(
            `[Broken Anchor] ${relFile}: "[${match[1]}](${rawTarget})" -> Anchor "#${anchor}" not found in "${relResolved}"`
          );
        }
      }
    }

    // 2. Check backtick concrete paths: `src/...`, `.agents/...`, etc.
    for (const match of content.matchAll(backtickPathRegex)) {
      const targetPath = match[1].replace(/[.:*]+$/, '');
      if (
        targetPath.includes('*') ||
        targetPath.includes('<') ||
        targetPath.includes('$') ||
        targetPath.includes('...')
      ) {
        continue;
      }

      // Check if it looks like a specific file or directory
      const ext = path.extname(targetPath);
      if (ext || targetPath.endsWith('/')) {
        const fullTargetPath = path.resolve(ROOT_DIR, targetPath);
        if (!fs.existsSync(fullTargetPath)) {
          errors.push(
            `[Broken Path Reference] ${relFile}: \`${match[1]}\` -> Path does not exist on disk`
          );
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(
      `\x1b[31mFound ${errors.length} documentation integrity error(s):\x1b[0m\n`
    );
    for (const error of errors) {
      console.error(`  ✖ ${error}`);
    }
    console.error('');
    process.exit(1);
  }

  console.log(
    `\x1b[32m✔ Documentation integrity verified across ${mdFiles.length} markdown files.\x1b[0m`
  );
}

run();
