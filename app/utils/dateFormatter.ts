/**
 * Formats a date string into a consistent format regardless of browser locale
 * This prevents hydration errors when using Google Translate
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (MM/DD/YYYY)
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Format as MM/DD/YYYY which works consistently across locales
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (error) {
    // In case of any parsing error, return the original string
    return dateString;
  }
}
