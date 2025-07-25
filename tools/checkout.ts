// File: /tools/checkout.ts

import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

/**
 * Initiates a Stripe checkout session
 * @param cartItems - Array of cart items with name, price, quantity
 * @returns Checkout session URL or error message
 */
export async function createCheckoutSession(cartItems: {
  name: string;
  price: number;
  quantity: number;
}[]) {
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
  } catch (error: any) {
    console.error('❌ Stripe Checkout Error:', error.message);
    return `❌ Failed to create checkout session: ${error.message}`;
  }
}
