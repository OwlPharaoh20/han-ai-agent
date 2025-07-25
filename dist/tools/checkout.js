"use strict";
// File: /tools/checkout.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = createCheckoutSession;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});
/**
 * Initiates a Stripe checkout session
 * @param cartItems - Array of cart items with name, price, quantity
 * @returns Checkout session URL or error message
 */
async function createCheckoutSession(cartItems) {
    try {
        const session = await stripe.checkout.sessions.create({
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
}
