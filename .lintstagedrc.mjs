/** @type {import('lint-staged').Config} */
const config = {
  '*.{js,jsx,mjs,ts,tsx,json,jsonc,grit}': [
    'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true',
  ],
  '*.{ts,tsx}': [
    () => 'tsc --noEmit',
    (filenames) => {
      const files = filenames.filter((file) => !file.endsWith('.d.ts'));
      if (files.length === 0) return [];
      return `vitest related --run ${files.map((file) => `"${file}"`).join(' ')}`;
    },
  ],
  '*.css': [
    'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true',
    'stylelint --fix',
  ],
};

export default config;
