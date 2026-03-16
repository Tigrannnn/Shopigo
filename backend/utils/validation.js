// // Validation utilities

// // Check required fields
// const validateRequired = (data, requiredFields) => {
//     const missing = [];
    
//     requiredFields.forEach(field => {
//         if (!data[field] && data[field] !== 0) {
//             missing.push(field);
//         }
//     });
    
//     if (missing.length > 0) {
//         throw new Error(`Missing required fields: ${missing.join(', ')}`);
//     }
// };

// // ID validation
// const validateId = (id) => {
//     if (!id || isNaN(Number(id)) || Number(id) <= 0) {
//         throw new Error('Invalid ID provided');
//     }
//     return Number(id);
// };

// // Email validation
// const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !emailRegex.test(email)) {
//         throw new Error('Invalid email format');
//     }
//     return email;
// };

// // Phone validation
// const validatePhone = (phone) => {
//     const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
//     if (!phone || !phoneRegex.test(phone)) {
//         throw new Error('Invalid phone format');
//     }
//     return phone;
// };

// // Price validation
// const validatePrice = (price) => {
//     const numPrice = Number(price);
//     if (isNaN(numPrice) || numPrice < 0) {
//         throw new Error('Invalid price');
//     }
//     return numPrice;
// };

// // Quantity validation
// const validateQuantity = (quantity) => {
//     const numQuantity = Number(quantity);
//     if (isNaN(numQuantity) || numQuantity <= 0) {
//         throw new Error('Invalid quantity');
//     }
//     return numQuantity;
// };

// // Order status validation
// const validateOrderStatus = (status) => {
//     const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
//     if (!validStatuses.includes(status)) {
//         throw new Error('Invalid order status');
//     }
//     return status;
// };

// // Array validation
// const validateArray = (arr, minLength = 1) => {
//     if (!Array.isArray(arr) || arr.length < minLength) {
//         throw new Error(`Array must have at least ${minLength} element(s)`);
//     }
//     return arr;
// };

// // Create custom error
// const createError = (message, status = 400) => {
//     const error = new Error(message);
//     error.status = status;
//     return error;
// };

// module.exports = {
//     validateRequired,
//     validateId,
//     validateEmail,
//     validatePhone,
//     validatePrice,
//     validateQuantity,
//     validateOrderStatus,
//     validateArray,
//     createError
// };
