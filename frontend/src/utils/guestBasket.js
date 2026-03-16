/**
 * Guest basket utilities for managing basket without authentication.
 * Data is stored in localStorage.
 */

const GUEST_BASKET_KEY = 'guestBasket';

/**
 * Retrieves guest basket from localStorage.
 * @returns {Array} Array of basket items
 */
export function getGuestBasket() {
  try {
    const data = localStorage.getItem(GUEST_BASKET_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving guest basket:', error);
    return [];
  }
}

/**
 * Saves basket to localStorage.
 * @param {Array} items - Basket items to save
 */
export function setGuestBasket(items) {
  localStorage.setItem(GUEST_BASKET_KEY, JSON.stringify(items));
}


/**
 * Adds a product to the guest basket.
 * If product already exists, increments its quantity.
 * @param {Object} product - Product to add
 * @returns {Array} Updated basket items
 */
export function addToGuestBasket(product) {
  const basket = getGuestBasket();
  const existing = basket.find(item => item.productId === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    basket.unshift({
      id: crypto.randomUUID(),
      productId: product.id,
      quantity: 1,
      selected: true,
      product,
    });
  }

  setGuestBasket(basket);
  return basket;
}

/**
 * Removes a product from the guest basket.
 * @param {string} productId - Product ID to remove
 * @returns {Array} Updated basket items
 */
export function removeFromGuestBasket(productId) {
  const basket = getGuestBasket().filter(item =>
    item.productId !== productId
  );
  setGuestBasket(basket);
  return basket;
}

/**
 * Toggles the selected state of a product in the guest basket.
 * @param {Object} basketProduct - Basket item to toggle
 * @returns {Array} Updated basket items
 */
export function toggleSelectedInGuestBasket(basketProduct) {
  const basket = getGuestBasket().map(item => {
    if (item.id === basketProduct.id) {
      return { ...item, selected: !item.selected };
    }
    return item;
  });
  setGuestBasket(basket);
  return basket;
}

/**
 * Toggles selection state for all items in the guest basket.
 * If allSelected is undefined, toggles to the opposite of current state.
 * @param {boolean} [allSelected] - Optional flag to set selection state
 * @returns {Array} Updated basket items
 */
export function toggleSelectAllInGuestBasket(allSelected) {
  const basket = getGuestBasket();
  if (allSelected === undefined) {
    allSelected = basket.every(item => item.selected);
  }
  const newBasket = basket.map(item => ({
    ...item,
    selected: !allSelected
  }));
  setGuestBasket(newBasket);
  return newBasket;
}

/**
 * Increases the quantity of a product in the guest basket by 1.
 * @param {Object} basketProduct - Basket item to update
 * @returns {Array} Updated basket items
 */
export function increaseQuantityInGuestBasket(basketProduct) {
  const basket = getGuestBasket().map(item => {
    if (item.id === basketProduct.id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  setGuestBasket(basket);
  return basket;
}

/**
 * Decreases the quantity of a product in the guest basket by 1.
 * Only decreases if quantity is greater than 1.
 * @param {Object} basketProduct - Basket item to update
 * @returns {Array} Updated basket items
 */
export function decreaseQuantityInGuestBasket(basketProduct) {
  const basket = getGuestBasket().map(item => {
    if (item.id === basketProduct.id && item.quantity > 1) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
  setGuestBasket(basket);
  return basket;
}

/**
 * Clears all items from the guest basket.
 * @returns {void}
 */
export function clearGuestBasket() {
  setGuestBasket([]);
}