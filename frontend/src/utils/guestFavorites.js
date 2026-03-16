/**
 * Guest favorites utilities for managing favorites without authentication.
 * Data is stored in localStorage.
 */

const GUEST_FAVORITES_KEY = 'guestFavorites';

/**
 * Retrieves guest favorites from localStorage.
 * @returns {Array} Array of favorite items
 */
export function getGuestFavorites() {
  try {
    const data = localStorage.getItem(GUEST_FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Saves favorites to localStorage.
 * @param {Array} items - Favorite items to save
 */
export function setGuestFavorites(items) {
  localStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify(items));
}

/**
 * Adds a product to the guest favorites.
 * If product already exists, it won't be added again.
 * @param {Object} product - Product to add
 * @returns {Array} Updated favorites items
 */
export function addToGuestFavorites(product) {
  const favorites = getGuestFavorites();
  const exists = favorites.some(item => item.productId === product.id);

  if (!exists) {
    favorites.unshift({
      id: crypto.randomUUID(),
      productId: product.id,
      product,
    });
  }

  setGuestFavorites(favorites);
  return favorites;
}

/**
 * Removes a product from the guest favorites.
 * @param {Object} product - Product to remove
 * @returns {Array} Updated favorites items
 */
export function removeFromGuestFavorites(product) {
  const favorites = getGuestFavorites().filter(
    item => item.productId !== product.id
  );
  setGuestFavorites(favorites);
  return favorites;
}

/**
 * Clears all items from the guest favorites.
 * @returns {void}
 */
export function clearGuestFavorites() {
  setGuestFavorites([]);
}
