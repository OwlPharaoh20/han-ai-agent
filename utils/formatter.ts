/**
 * Utility functions for formatting data displayed to users.
 */

/**
 * Format a monetary amount for display.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format product details for display.
 */
export function formatProduct(product: { title: string; price: number; [key: string]: any }): string {
  return `📦 **${product.title}**\n💰 ${formatPrice(product.price)}`;
}

/**
 * Format cart summary with itemized total.
 */
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export function formatCartSummary(items: CartItem[]): string {
  if (items.length === 0) {
    return "🛒 Your cart is empty.";
  }

  const itemizedList = items
    .map(
      (item: CartItem, index: number) =>
        `${index + 1}. ${item.name} - ${formatPrice(item.price)} x ${item.quantity}`
    )
    .join("\n");

  const total = formatPrice(
    items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
  );

  return `🛒 **Cart Summary:**\n${itemizedList}\n\n💳 **Total: ${total}**`;
}