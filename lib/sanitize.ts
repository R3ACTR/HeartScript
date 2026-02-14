/**
 * Sanitizes user input names.
 * - Trims whitespace
 * - Converts to lowercase
 * - Removes non-alphabet characters
 */

export function sanitizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

/**
 * Validates that both names are non-empty after sanitization.
 */
export function validateNames(name1: string, name2: string): boolean {
  return name1.length > 0 && name2.length > 0;
}
