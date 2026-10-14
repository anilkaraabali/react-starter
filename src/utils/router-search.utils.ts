type Primitive = boolean | number | string;

const isPrimitive = (value: unknown): value is Primitive =>
  ['boolean', 'number', 'string'].includes(typeof value);

/**
 * Custom search params serializer for TanStack Router:
 * Serializes primitive arrays as repeated keys (e.g. `?entityType=member&entityType=org`)
 * matching the standard backend/REST query format without JSON encoding.
 */
export function stringifySearch(search: Record<string, unknown>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(search)) {
    if (value == null || value === '') continue;

    if (Array.isArray(value) && value.every(isPrimitive)) {
      for (const item of value) {
        params.append(key, String(item));
      }
    } else if (typeof value === 'object') {
      params.append(key, JSON.stringify(value));
    } else {
      params.append(key, String(value));
    }
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}
