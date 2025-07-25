"use strict";
// File: /utils/formatter.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = formatPrice;
exports.formatProduct = formatProduct;
exports.formatCartSummary = formatCartSummary;
/**
 * Formats a price number into USD currency format
 * @param {number} amount
 * @returns {string}
 */
function formatPrice(amount) {
    return `$${Number(amount).toFixed(2)}`;
}
/**
 * Formats product details for display in the CLI
 * @param {Object} product - product object from API
 * @returns {string}
 */
function formatProduct(product) {
    return `\n📦 ${product.title}
  🆔 ID: ${product.productId}
  💰 Price: ${formatPrice(product.price)}\n`;
}
/**
 * Formats cart items for summary view
 * @param {Array} items - list of cart items
 * @returns {string}
 */
function formatCartSummary(items) {
    if (!items.length)
        return '🛒 Your cart is empty.';
    return ('\n🛒 Cart Items:\n' +
        items
            .map((item, index) => `${index + 1}. ${item.name} - ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.quantity * item.price)}`)
            .join('\n') +
        `\n\n🧾 Total: ${formatPrice(items.reduce((sum, item) => sum + item.price * item.quantity, 0))}`);
}
