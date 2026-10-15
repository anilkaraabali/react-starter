import { describe, expect, it } from 'vitest';
import { calculateProfitMargin } from '@/features/products/utils/product.utils';

describe('product.utils', () => {
  describe('calculateProfitMargin', () => {
    it('calculates the profit margin ratio correctly', () => {
      // (189 - 90) / 189 ≈ 0.5238
      const margin = calculateProfitMargin(189, 90);
      expect(margin).toBeCloseTo(0.5238, 3);
    });

    it('returns null if costPrice is missing or price is zero/negative', () => {
      expect(calculateProfitMargin(189, null)).toBeNull();
      expect(calculateProfitMargin(189, undefined)).toBeNull();
      expect(calculateProfitMargin(0, 50)).toBeNull();
      expect(calculateProfitMargin(-10, 50)).toBeNull();
    });
  });
});
