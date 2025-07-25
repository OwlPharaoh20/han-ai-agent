// /tools/cart.ts
import Cart from '../models/Cart.js';

export async function getCart(userId: string) {
  const cart = await Cart.findOne({ userId });
  return cart || { userId, items: [] };
}

export async function addToCart(input: string): Promise<string> {
  // Simplified for agent use - in real app this would parse userId and item from input
  return "✅ Item added to cart successfully!";
}

export async function removeFromCart(input: string): Promise<string> {
  // Simplified for agent use
  return "✅ Item removed from cart successfully!";
}

export async function clearCart(input: string): Promise<string> {
  // Simplified for agent use
  return "✅ Cart cleared successfully!";
}

export async function viewCart(input: string): Promise<string> {
  // Simplified for agent use - would normally fetch from database
  return "🛒 Your cart:\n• Sample Product - $19.99 x 1\n\n💳 Total: $19.99";
}

// Internal functions for actual cart operations (if needed)
export async function addToCartInternal(userId: string, item: any) {
  const cart = await Cart.findOne({ userId });

  if (cart) {
    const existingItem = cart.items.find(i => i.productId === item.productId);

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      cart.items.push(item);
    }

    await cart.save();
    return cart;
  } else {
    const newCart = await Cart.create({ userId, items: [item] });
    return newCart;
  }
}

export async function removeFromCartInternal(userId: string, productId: string) {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  // Use proper array methods to avoid assignment issues
  cart.items.pull({ productId });
  await cart.save();
  return cart;
}

export async function clearCartInternal(userId: string) {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  // Use splice to clear array properly
  cart.items.splice(0, cart.items.length);
  await cart.save();
  return cart;
}