/**
 * Calculates profit margin ratio: (price - costPrice) / price.
 * Returns ratio (e.g. 0.52 for 52%) or null if invalid.
 */
export function calculateProfitMargin(
  price: number,
  costPrice?: null | number
): number | null {
  if (costPrice == null || price <= 0) {
    return null;
  }

  return (price - costPrice) / price;
}
