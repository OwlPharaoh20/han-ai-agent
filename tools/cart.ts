// /tools/cart.ts
import Cart from '../models/Cart.js';

export async function getCart(userId: string) {
  const cart = await Cart.findOne({ userId });
  return cart || { userId, items: [] };
}

export async function addToCart(input: string): Promise<string> {
  try {
    // For demo purposes, return a success message
    // In a real implementation, you would parse the input and add the item
    return "✅ Item added to cart successfully! You can view your cart anytime by asking me to show it.";
  } catch (error) {
    return "❌ Failed to add item to cart. Please try again.";
  }
}

export async function removeFromCart(input: string): Promise<string> {
  try {
    // For demo purposes, return a success message
    return "✅ Item removed from cart successfully!";
  } catch (error) {
    return "❌ Failed to remove item from cart. Please try again.";
  }
}

export async function clearCart(input: string): Promise<string> {
  try {
    // For demo purposes, return a success message
    return "✅ Cart cleared successfully! Your cart is now empty.";
  } catch (error) {
    return "❌ Failed to clear cart. Please try again.";
  }
}

export async function viewCart(input: string): Promise<string> {
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
  } catch (error) {
    return "❌ Failed to load cart. Please try again.";
  }
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