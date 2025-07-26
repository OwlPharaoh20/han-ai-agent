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
        try {
            // For demo purposes, return a success message
            // In a real implementation, you would parse the input and add the item
            return "✅ Item added to cart successfully! You can view your cart anytime by asking me to show it.";
        }
        catch (error) {
            return "❌ Failed to add item to cart. Please try again.";
        }
    });
}
export function removeFromCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // For demo purposes, return a success message
            return "✅ Item removed from cart successfully!";
        }
        catch (error) {
            return "❌ Failed to remove item from cart. Please try again.";
        }
    });
}
export function clearCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // For demo purposes, return a success message
            return "✅ Cart cleared successfully! Your cart is now empty.";
        }
        catch (error) {
            return "❌ Failed to clear cart. Please try again.";
        }
    });
}
export function viewCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // For demo purposes, return a sample cart
            // In a real implementation, you would fetch the actual cart from the database
            const cartItems = [
                { name: "iPhone 15 Pro", price: 999.99, quantity: 1 },
                { name: "AirPods Pro", price: 249.99, quantity: 2 }
            ];
            if (cartItems.length === 0) {
                return "🛒 Your cart is empty. Try searching for products to add some items!";
            }
            let cartDisplay = "🛒 Your cart:\n";
            let total = 0;
            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                cartDisplay += `• ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
            });
            cartDisplay += `\n💳 Total: $${total.toFixed(2)}`;
            cartDisplay += "\n\n💡 You can add more items, remove items, or proceed to checkout!";
            return cartDisplay;
        }
        catch (error) {
            return "❌ Failed to load cart. Please try again.";
        }
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
