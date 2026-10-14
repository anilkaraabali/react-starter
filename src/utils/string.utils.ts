export function trimOrUndefined(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

/**
 * Initials from a display name: first + last word (e.g. "Ada Lovelace" → "AL").
 * Single word → first character. Empty → null (caller shows icon fallback).
 */
export function getUserInitials(name?: null | string): null | string {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (parts.length === 0) {
    return null;
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}
