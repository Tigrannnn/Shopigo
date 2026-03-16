/**
 * Guest recently viewed utilities for managing recently viewed products without authentication.
 * Data is stored in localStorage.
 */

const GUEST_RECENTLY_VIEWED_KEY = 'guestRecentlyViewed';

/**
 * Retrieves guest recently viewed products from localStorage.
 * @returns {Array} Array of recently viewed items
 */
export function getGuestRecentlyViewed() {
  try {
    const data = localStorage.getItem(GUEST_RECENTLY_VIEWED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Saves recently viewed products to localStorage.
 * @param {Array} items - Recently viewed items to save
 */
export function setGuestRecentlyViewed(items) {
  localStorage.setItem(GUEST_RECENTLY_VIEWED_KEY, JSON.stringify(items));
}

/**
 * Adds a product to the guest recently viewed list.
 * If product already exists, it won't be added again.
 * @param {Object} product - Product to add
 * @returns {Array} Updated recently viewed items
 */
export function addToGuestRecentlyViewed(product) {
  const items = getGuestRecentlyViewed();
  const exists = items.some(item => item.productId === product.id);

  if (!exists) {
    items.unshift({
      id: crypto.randomUUID(),
      productId: product.id,
      product,
    });
  }

  setGuestRecentlyViewed(items);
  return items;
}

/**
 * Clears all items from the guest recently viewed list.
 * @returns {void}
 */
export function clearGuestRecentlyViewed() {
  setGuestRecentlyViewed([]);
}

