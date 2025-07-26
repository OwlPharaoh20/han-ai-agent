// File: tools/product_search.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const API_HOST = "product-search-api.p.rapidapi.com";
const API_URL = "https://product-search-api.p.rapidapi.com/search";
/**
 * Search for products using the RapidAPI Product Search API.
 * @param query - The search term (e.g., "iPhone", "headphones")
 * @returns A simplified list of matching product titles and prices.
 */
export function searchProducts(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Check if API key is available
            if (!RAPID_API_KEY) {
                // Return demo data if API key is not available
                const demoProducts = [
                    { title: "iPhone 15 Pro", price: "$999.99" },
                    { title: "Samsung Galaxy S24", price: "$899.99" },
                    { title: "MacBook Pro 14-inch", price: "$1,999.99" },
                    { title: "Sony WH-1000XM5 Headphones", price: "$399.99" },
                    { title: "Apple Watch Series 9", price: "$399.99" }
                ];
                const results = demoProducts.map((item, idx) => {
                    return `#${idx + 1}: ${item.title} - ${item.price}`;
                });
                return `🛍️ Demo products for "${query}":\n\n${results.join("\n")}\n\n💡 This is demo data. In production, this would search real products!`;
            }
            const response = yield axios.get(API_URL, {
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
            const items = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.shopping_results) || [];
            if (items.length === 0) {
                return `🛒 No products found for "${query}". Try searching for something else!`;
            }
            const results = items.slice(0, 5).map((item, idx) => {
                const price = item.price || "Price not available";
                return `#${idx + 1}: ${item.title} - $${price}`;
            });
            return `🛍️ Top products for "${query}":\n\n${results.join("\n")}\n\n💡 You can ask me to add any of these items to your cart!`;
        }
        catch (error) {
            console.error("❌ Product Search API Error:", error.message);
            // Return demo data on API error
            const demoProducts = [
                { title: "iPhone 15 Pro", price: "$999.99" },
                { title: "Samsung Galaxy S24", price: "$899.99" },
                { title: "MacBook Pro 14-inch", price: "$1,999.99" },
                { title: "Sony WH-1000XM5 Headphones", price: "$399.99" },
                { title: "Apple Watch Series 9", price: "$399.99" }
            ];
            const results = demoProducts.map((item, idx) => {
                return `#${idx + 1}: ${item.title} - ${item.price}`;
            });
            return `🛍️ Demo products for "${query}" (API unavailable):\n\n${results.join("\n")}\n\n💡 This is demo data due to API issues. In production, this would search real products!`;
        }
    });
}
