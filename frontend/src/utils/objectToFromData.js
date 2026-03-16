/**
 * Convert a plain object to FormData format
 * Handles null/undefined values and arrays
 * @param {Object} obj - Object to convert
 * @returns {FormData} FormData instance
 */
export function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    // Skip null and undefined values
    if (value === undefined || value === null) return;

    // Handle arrays (e.g., sizes: ['S','M'])
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          formData.append(key, item);
        }
      });
      return;
    }

    formData.append(key, value);
  });

  return formData;
}