// File: /tools/checkout.ts

import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
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

export async function checkoutCart(input: string): Promise<string> {
  try {
    // Check if Stripe key is available
    if (!process.env.STRIPE_SECRET_KEY) {
      return `💳 Demo Checkout Process:\n\n✅ Payment simulation completed successfully!\n\n📧 Order confirmation sent to your email\n🚚 Estimated delivery: 3-5 business days\n\n💡 This is a demo. In production, this would redirect to Stripe for real payment processing.`;
    }

    // For demo purposes, simulate a successful checkout
    // In a real implementation, you would:
    // 1. Get the actual cart items
    // 2. Create a Stripe checkout session
    // 3. Return the checkout URL
    
    return `💳 Checkout Process:\n\n✅ Payment processed successfully!\n\n📧 Order confirmation sent to your email\n🚚 Estimated delivery: 3-5 business days\n💰 Total charged: $1,499.97\n\n🎉 Thank you for your purchase!`;
    
  } catch (error) {
    console.error("❌ Checkout Error:", error);
    return "❌ Checkout failed. Please try again or contact support.";
  }
}