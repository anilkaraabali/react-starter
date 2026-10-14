#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Go up one level: from scripts to project root
const projectRoot = path.resolve(__dirname, '..');

function syncEnTranslations() {
  try {
    // Read the English PO file
    const enPoPath = path.join(projectRoot, 'src/locales/en/messages.po');
    console.log('Reading file from:', enPoPath);

    const content = fs.readFileSync(enPoPath, 'utf8');

    // Split the content into entries
    const entries = content.split('\n\n');

    // Process each entry
    const processedEntries = entries.map((entry) => {
      // Skip the header
      if (entry.startsWith('msgid ""') && entry.includes('POT-Creation-Date')) {
        return entry;
      }

      const lines = entry.split('\n');
      let msgid = '';

      // Extract msgid
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('msgid "')) {
          msgid = line.substring(7, line.length - 1);
          // Handle multi-line msgid
          let j = i + 1;
          while (j < lines.length && lines[j].startsWith('"')) {
            msgid += lines[j].substring(1, lines[j].length - 1);
            j++;
          }
        } else if (line.startsWith('msgstr "')) {
          // If msgstr is empty, replace it with msgid
          if (line === 'msgstr ""') {
            lines[i] = `msgstr "${msgid}"`;
          }
        }
      }

      return lines.join('\n');
    });

    // Join all entries back together
    const processedContent = processedEntries.join('\n\n');

    // Write the processed content back to the file
    fs.writeFileSync(enPoPath, processedContent);

    console.log(
      'Successfully copied msgids to empty msgstr fields in English locale.'
    );
  } catch (error) {
    console.error('Error processing translations:', error);
    process.exit(1);
  }
}

syncEnTranslations();
