import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
  type RouteRegistration,
  registerRoutes,
} from '../_lib/register-routes.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
// `generators/__tests__` is two levels below the repo root.
const realFile = path.resolve(here, '../../src/config/app-routes.constants.ts');

const invoice: RouteRegistration = {
  featureDir: 'invoices',
  pluralTitle: 'Invoices',
  routeKeyDetail: 'INVOICE_DETAIL',
  routeKeyEdit: 'INVOICE_EDIT',
  routeKeyList: 'INVOICES',
  routeKeyNew: 'INVOICE_NEW',
  routeParam: 'invoiceId',
};

function withTempCopy<T>(run: (filePath: string) => T): T {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'app-routes-'));
  const file = path.join(dir, 'app-routes.constants.ts');

  try {
    fs.copyFileSync(realFile, file);
    return run(file);
  } finally {
    fs.rmSync(dir, { force: true, recursive: true });
  }
}

describe('registerRoutes', () => {
  it('adds a group to both APP_ROUTES and APP_ROUTE_IDS', () => {
    withTempCopy((file) => {
      registerRoutes(file, invoice);
      const content = fs.readFileSync(file, 'utf8');

      expect(content).toContain('// Invoices');
      expect(content).toContain("INVOICES: '/invoices',");
      expect(content).toContain("INVOICE_NEW: '/invoices/new',");
      expect(content).toContain("INVOICE_DETAIL: '/invoices/$invoiceId',");
      expect(content).toContain("INVOICE_EDIT: '/invoices/$invoiceId/edit',");
    });
  });

  it('keeps the existing products group untouched', () => {
    withTempCopy((file) => {
      registerRoutes(file, invoice);
      const content = fs.readFileSync(file, 'utf8');

      expect(content).toContain("PRODUCTS: '/products',");
      expect(content).toContain("PRODUCT_EDIT: '/products/$productId/edit',");
      expect(content).toContain("PRODUCTS: '/_admin/products/',");
    });
  });

  /**
   * `APP_ROUTE_IDS` are TanStack route ids, which carry the layout prefix and a
   * trailing slash on index/detail. Missing it is not a type error — it only
   * breaks at navigate time.
   */
  it('emits the id shape for APP_ROUTE_IDS and the fullPath shape for APP_ROUTES', () => {
    withTempCopy((file) => {
      registerRoutes(file, invoice);
      const content = fs.readFileSync(file, 'utf8');

      expect(content).toContain("INVOICES: '/_admin/invoices/',");
      expect(content).toContain("INVOICE_NEW: '/_admin/invoices/new',");
      expect(content).toContain(
        "INVOICE_DETAIL: '/_admin/invoices/$invoiceId/',"
      );
      expect(content).toContain(
        "INVOICE_EDIT: '/_admin/invoices/$invoiceId/edit',"
      );
    });
  });

  it('is idempotent', () => {
    withTempCopy((file) => {
      registerRoutes(file, invoice);
      const afterFirst = fs.readFileSync(file, 'utf8');

      const second = registerRoutes(file, invoice);

      expect(second.changed).toBe(false);
      expect(fs.readFileSync(file, 'utf8')).toBe(afterFirst);
    });
  });

  it('keeps both objects in sync for a second module', () => {
    withTempCopy((file) => {
      registerRoutes(file, invoice);
      registerRoutes(file, {
        ...invoice,
        featureDir: 'orders',
        pluralTitle: 'Orders',
        routeKeyDetail: 'ORDER_DETAIL',
        routeKeyEdit: 'ORDER_EDIT',
        routeKeyList: 'ORDERS',
        routeKeyNew: 'ORDER_NEW',
        routeParam: 'orderId',
      });

      const content = fs.readFileSync(file, 'utf8');

      expect(content).toContain("INVOICES: '/invoices',");
      expect(content).toContain("ORDERS: '/orders',");
      expect(content).toContain("ORDERS: '/_admin/orders/',");
    });
  });

  it('leaves the file alone when the constants object is missing', () => {
    withTempCopy((file) => {
      const original = fs.readFileSync(file, 'utf8');
      const stripped = original.replace(
        'APP_ROUTE_IDS',
        'APP_ROUTE_IDS_REMOVED'
      );

      fs.writeFileSync(file, stripped);
      const result = registerRoutes(file, invoice);

      expect(result.changed).toBe(false);
    });
  });
});
