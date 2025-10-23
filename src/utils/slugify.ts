/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to convert
 * @returns URL-friendly slug
 *
 * @example
 * slugify("Wissenschaftliches Arbeiten") // "wissenschaftliches-arbeiten"
 * slugify("Mobile Entwicklung") // "mobile-entwicklung"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Convert slug back to a readable format
 * @param slug - The slug to convert
 * @returns Readable text
 *
 * @example
 * deslugify("wissenschaftliches-arbeiten") // "Wissenschaftliches Arbeiten"
 */
export function deslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
