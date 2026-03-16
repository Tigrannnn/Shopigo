/**
 * Filters an array of objects by search query in specified fields (case-insensitive).
 * @param {Array} items - Array of objects to search
 * @param {string} search - Search query
 * @param {string[]} fields - Fields to search in (default: ['name'])
 * @returns {Array} Filtered array
 */
export function searchItems(items, search, fields = ['name']) {
  const query = search.trim().toLowerCase();
  if (!query) return items ?? [];
  return (items ?? []).filter(item =>
    fields.some(field => {
      const value = item?.[field];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(query)
      );
    })
  );
}
