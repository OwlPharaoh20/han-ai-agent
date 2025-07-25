// /tools/cart.ts
import Cart from '../models/Cart';

export async function getCart(userId: string) {
  const cart = await Cart.findOne({ userId });
  return cart || { userId, items: [] };
}

export async function addToCart(userId: string, item: any) {
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

export async function removeFromCart(userId: string, productId: string) {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  cart.items = cart.items.filter(i => i.productId !== productId);
  await cart.save();
  return cart;
}

export async function clearCart(userId: string) {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  cart.items = [];
  await cart.save();
  return cart;
}

export async function viewCart(userId: string): Promise<string> {
  const cart = await getCart(userId);
  if (!cart || !cart.items || cart.items.length === 0) return "🛒 Your cart is empty.";
  return cart.items
    .map(
      (item: any) =>
        `• ${item.name} (${item.quantity}) – $${item.price}`
    )
    .join("\n");
}
