/**
 * Capitalizes the first letter of a string.
 * If the string is empty, null, or undefined, returns the original value.
 * 
 * @param {string} str - The string to capitalize
 * @returns {string} The string with the first letter capitalized, or the original value if falsy
 * 
 * @example
 * capitalizeFirstLetter('hello') // 'Hello'
 * capitalizeFirstLetter('shopigo') // 'Shopigo'
 * capitalizeFirstLetter('') // ''
 * capitalizeFirstLetter(null) // null
 */

export default function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}