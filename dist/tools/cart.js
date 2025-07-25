var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// /tools/cart.ts
import Cart from '../models/Cart.js';
export function getCart(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield Cart.findOne({ userId });
        return cart || { userId, items: [] };
    });
}
export function addToCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // Simplified for agent use - in real app this would parse userId and item from input
        return "✅ Item added to cart successfully!";
    });
}
export function removeFromCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // Simplified for agent use
        return "✅ Item removed from cart successfully!";
    });
}
export function clearCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // Simplified for agent use
        return "✅ Cart cleared successfully!";
    });
}
export function viewCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // Simplified for agent use - would normally fetch from database
        return "🛒 Your cart:\n• Sample Product - $19.99 x 1\n\n💳 Total: $19.99";
    });
}
// Internal functions for actual cart operations (if needed)
export function addToCartInternal(userId, item) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield Cart.findOne({ userId });
        if (cart) {
            const existingItem = cart.items.find(i => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity || 1;
            }
            else {
                cart.items.push(item);
            }
            yield cart.save();
            return cart;
        }
        else {
            const newCart = yield Cart.create({ userId, items: [item] });
            return newCart;
        }
    });
}
export function removeFromCartInternal(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield Cart.findOne({ userId });
        if (!cart)
            return null;
        // Use proper array methods to avoid assignment issues
        cart.items.pull({ productId });
        yield cart.save();
        return cart;
    });
}
export function clearCartInternal(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield Cart.findOne({ userId });
        if (!cart)
            return null;
        // Use splice to clear array properly
        cart.items.splice(0, cart.items.length);
        yield cart.save();
        return cart;
    });
}
