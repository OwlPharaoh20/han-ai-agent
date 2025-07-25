// File: tools/product_search.ts

import axios from "axios";

const RAPID_API_KEY = process.env.RAPID_API_KEY!;
const API_HOST = "product-search-api.p.rapidapi.com";
const API_URL = "https://product-search-api.p.rapidapi.com/search";

/**
 * Search for products using the RapidAPI Product Search API.
 * @param query - The search term (e.g., "iPhone", "headphones")
 * @returns A simplified list of matching product titles and prices.
 */
export async function searchProducts(query: string): Promise<string> {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        country: "us",
        language: "en"
      },
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": API_HOST
      }
    });

    const items = response.data?.shopping_results || [];

    if (items.length === 0) return "🛒 No matching products found.";

    const results = items.slice(0, 5).map((item: any, idx: number) => {
      return `#${idx + 1}: ${item.title} - $${item.price || "N/A"}`;
    });

    return `🛍️ Top products for "${query}":\n\n${results.join("\n")}`;

  } catch (error: any) {
    console.error("❌ Product Search API Error:", error.message);
    return "❌ Failed to fetch product results. Please try again.";
  }
}
