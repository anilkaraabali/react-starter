import fs from 'node:fs';
import path from 'node:path';

/**
 * Adds a module's routes to `src/config/app-routes.constants.ts`.
 *
 * Both exported maps have to stay in sync with the files under
 * `src/app/routes`, and that file's own docblock says feature code should
 * prefer these constants over raw path strings — so leaving it to a manual
 * follow-up step meant the generated module shipped with a missing entry and
 * nothing failed until someone wired up the sidebar.
 *
 * The insertion is anchored on the `} as const;` line that closes each object
 * literal, which is the only stable shape here: the file is deliberately exempt
 * from key sorting (`biome-ignore-all assist/source/useSortedKeys`) because the
 * entries are grouped by domain.
 */

const CLOSING_LINE = '} as const;';

export type RouteRegistration = {
  /** Kebab-case plural feature folder, e.g. `invoices`. */
  featureDir: string;
  /** PascalCase plural for the group comment, e.g. `Invoices`. */
  pluralTitle: string;
  /** Route param, e.g. `invoiceId`. */
  routeParam: string;
  /** `APP_ROUTES` key for the list route, e.g. `INVOICES`. */
  routeKeyList: string;
  /** `APP_ROUTES` key for the create route, e.g. `INVOICE_NEW`. */
  routeKeyNew: string;
  /** `APP_ROUTES` key for the detail route, e.g. `INVOICE_DETAIL`. */
  routeKeyDetail: string;
  /** `APP_ROUTES` key for the edit route, e.g. `INVOICE_EDIT`. */
  routeKeyEdit: string;
};

function buildGroup(
  {
    featureDir,
    pluralTitle,
    routeParam,
    routeKeyDetail,
    routeKeyEdit,
    routeKeyList,
    routeKeyNew,
  }: RouteRegistration,
  prefix: string,
  trailingSlash: boolean
): string[] {
  const base = `${prefix}/${featureDir}`;
  const detail = `${base}/$${routeParam}`;
  const slash = trailingSlash ? '/' : '';

  return [
    `  // ${pluralTitle}`,
    `  ${routeKeyList}: '${base}${slash}',`,
    `  ${routeKeyNew}: '${base}/new',`,
    `  ${routeKeyDetail}: '${detail}${slash}',`,
    `  ${routeKeyEdit}: '${detail}/edit',`,
  ];
}

export function registerRoutes(
  filePath: string,
  data: RouteRegistration
): {
  changed: boolean;
  filePath: string;
} {
  if (!fs.existsSync(filePath)) {
    return { changed: false, filePath };
  }

  const original = fs.readFileSync(filePath, 'utf8');
  const lines = original.split('\n');

  // Route ids carry the layout prefix and a trailing slash on index/detail
  // routes (`/_admin/products/`), while `APP_ROUTES` holds the public fullPath
  // without one. Getting this wrong is not a type error — TanStack only checks
  // it at navigate time — so the two shapes are generated separately.
  const targets = [
    { name: 'APP_ROUTES', prefix: '', trailingSlash: false },
    { name: 'APP_ROUTE_IDS', prefix: '/_admin', trailingSlash: true },
  ];

  const output: string[] = [];
  let cursor = 0;
  let changed = false;

  for (const target of targets) {
    const start = findExportStart(lines, target.name, cursor);

    if (start === -1) {
      return { changed: false, filePath };
    }

    const end = findClosingLine(lines, start + 1);

    if (end === -1) {
      return { changed: false, filePath };
    }

    output.push(...lines.slice(cursor, end));

    // Idempotent: re-running the generator must not duplicate the group.
    const body = lines.slice(start, end).join('\n');

    if (!body.includes(`${data.routeKeyEdit}:`)) {
      output.push('', ...buildGroup(data, target.prefix, target.trailingSlash));
      changed = true;
    }

    cursor = end;
  }

  output.push(...lines.slice(cursor));

  if (changed) {
    fs.writeFileSync(filePath, output.join('\n'));
  }

  return { changed, filePath };
}

function findExportStart(lines: string[], name: string, from: number): number {
  const marker = `export const ${name} = {`;

  return lines.findIndex(
    (line, index) => index >= from && line.includes(marker)
  );
}

function findClosingLine(lines: string[], from: number): number {
  return lines.findIndex(
    (line, index) => index >= from && line.trim() === CLOSING_LINE
  );
}

export function resolveAppRoutesFile(): string {
  return path.join(process.cwd(), 'src/config/app-routes.constants.ts');
}
