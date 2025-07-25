"use strict";
/**
 * Utility functions for formatting data displayed to users.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = formatPrice;
exports.formatProduct = formatProduct;
exports.formatCartSummary = formatCartSummary;
/**
 * Format a monetary amount for display.
 */
function formatPrice(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}
/**
 * Format product details for display.
 */
function formatProduct(product) {
    return `📦 **${product.title}**\n💰 ${formatPrice(product.price)}`;
}
function formatCartSummary(items) {
    if (items.length === 0) {
        return "🛒 Your cart is empty.";
    }
    const itemizedList = items
        .map((item, index) => `${index + 1}. ${item.name} - ${formatPrice(item.price)} x ${item.quantity}`)
        .join("\n");
    const total = formatPrice(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
    return `🛒 **Cart Summary:**\n${itemizedList}\n\n💳 **Total: ${total}**`;
}
