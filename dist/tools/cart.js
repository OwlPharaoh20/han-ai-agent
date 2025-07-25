"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = getCart;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.clearCart = clearCart;
exports.viewCart = viewCart;
// /tools/cart.ts
const Cart_1 = __importDefault(require("../models/Cart"));
async function getCart(userId) {
    const cart = await Cart_1.default.findOne({ userId });
    return cart || { userId, items: [] };
}
async function addToCart(userId, item) {
    const cart = await Cart_1.default.findOne({ userId });
    if (cart) {
        const existingItem = cart.items.find(i => i.productId === item.productId);
        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        }
        else {
            cart.items.push(item);
        }
        await cart.save();
        return cart;
    }
    else {
        const newCart = await Cart_1.default.create({ userId, items: [item] });
        return newCart;
    }
}
async function removeFromCart(userId, productId) {
    const cart = await Cart_1.default.findOne({ userId });
    if (!cart)
        return null;
    cart.items = cart.items.filter(i => i.productId !== productId);
    await cart.save();
    return cart;
}
async function clearCart(userId) {
    const cart = await Cart_1.default.findOne({ userId });
    if (!cart)
        return null;
    cart.items = [];
    await cart.save();
    return cart;
}
async function viewCart(userId) {
    const cart = await getCart(userId);
    if (!cart || !cart.items || cart.items.length === 0)
        return "🛒 Your cart is empty.";
    return cart.items
        .map((item) => `• ${item.name} (${item.quantity}) – $${item.price}`)
        .join("\n");
}
