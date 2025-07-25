"use strict";
// File: tools/product_search.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = searchProducts;
exports.searchProducts = searchProducts;
const axios_1 = __importDefault(require("axios"));
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const API_HOST = "product-search-api.p.rapidapi.com";
const API_URL = "https://product-search-api.p.rapidapi.com/search";
/**
 * Search for products using the RapidAPI Product Search API.
 * @param query - The search term (e.g., "iPhone", "headphones")
 * @returns A simplified list of matching product titles and prices.
 */
async function searchProducts(query) {
    try {
        const response = await axios_1.default.get(API_URL, {
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
        if (items.length === 0)
            return "🛒 No matching products found.";
        const results = items.slice(0, 5).map((item, idx) => {
            return `#${idx + 1}: ${item.title} - $${item.price || "N/A"}`;
        });
        return `🛍️ Top products for "${query}":\n\n${results.join("\n")}`;
    }
    catch (error) {
        console.error("❌ Product Search API Error:", error.message);
        return "❌ Failed to fetch product results. Please try again.";
    }
}
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const API_HOST = "product-search-api.p.rapidapi.com";
const API_URL = "https://product-search-api.p.rapidapi.com/search";
/**
 * Search for products using the RapidAPI Product Search API.
 * @param query - The search term (e.g., "iPhone", "headphones")
 * @returns A simplified list of matching product titles and prices.
 */
async function searchProducts(query) {
    try {
        const response = await axios_1.default.get(API_URL, {
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
        if (items.length === 0)
            return "🛒 No matching products found.";
        const results = items.slice(0, 5).map((item, idx) => {
            return `#${idx + 1}: ${item.title} - $${item.price || "N/A"}`;
        });
        return `🛍️ Top products for "${query}":\n\n${results.join("\n")}`;
    }
    catch (error) {
        console.error("❌ Product Search API Error:", error.message);
        return "❌ Failed to fetch product results. Please try again.";
    }
}
