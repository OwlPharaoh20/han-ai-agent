"use strict";
// File: /tools/checkout.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = createCheckoutSession;
exports.checkoutCart = checkoutCart;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
});
/**
 * Initiates a Stripe checkout session
 * @param cartItems - Array of cart items with name, price, quantity
 * @returns Checkout session URL or error message
 */
function createCheckoutSession(cartItems) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: cartItems.map((item) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: Math.round(item.price * 100), // in cents
                    },
                    quantity: item.quantity,
                })),
                success_url: 'https://example.com/success',
                cancel_url: 'https://example.com/cancel',
            });
            return session.url;
        }
        catch (error) {
            console.error('❌ Stripe Checkout Error:', error.message);
            return `❌ Failed to create checkout session: ${error.message}`;
        }
    });
}
function checkoutCart(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // This is a simplified version for the agent to use
        return "🎉 Checkout functionality would redirect to Stripe payment page.";
    });
}
