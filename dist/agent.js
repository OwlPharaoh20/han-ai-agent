"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrompt = handlePrompt;
const openai_1 = require("@langchain/openai");
const agents_1 = require("langchain/agents");
const dotenv_1 = require("dotenv");
const product_search_1 = require("./tools/product_search");
const cart_1 = require("./tools/cart");
const checkout_1 = require("./tools/checkout");
(0, dotenv_1.config)(); // Load .env variables
const tools = [
    new agents_1.Tool({
        name: "searchProducts",
        description: "Search for e-commerce products by keyword (e.g., 'iPhone')",
        func: product_search_1.searchProducts,
    }),
    new agents_1.Tool({
        name: "viewCart",
        description: "View all items currently in the cart",
        func: cart_1.viewCart,
    }),
    new agents_1.Tool({
        name: "addToCart",
        description: "Add a product to the cart using name, price, and quantity",
        func: cart_1.addToCart,
    }),
    new agents_1.Tool({
        name: "removeFromCart",
        description: "Remove a product from the cart by productId",
        func: cart_1.removeFromCart,
    }),
    new agents_1.Tool({
        name: "clearCart",
        description: "Clear all items in the cart",
        func: cart_1.clearCart,
    }),
    new agents_1.Tool({
        name: "checkoutCart",
        description: "Checkout and simulate payment using Stripe",
        func: checkout_1.checkoutCart,
    }),
];
const model = new openai_1.ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
});
const executorPromise = (0, agents_1.initializeAgentExecutorWithOptions)(tools, model, {
    agentType: "openai-functions",
    verbose: true,
});
async function handlePrompt(prompt) {
    const executor = await executorPromise;
    const response = await executor.run({ input: prompt });
    return response;
}
