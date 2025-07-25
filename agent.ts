import { ChatOpenAI } from "@langchain/openai";
import { Tool, initializeAgentExecutorWithOptions } from "langchain/agents";
import { config } from "dotenv";
import { searchProducts } from "./tools/product_search";
import { viewCart, addToCart, removeFromCart, clearCart } from "./tools/cart";
import { checkoutCart } from "./tools/checkout";

config(); // Load .env variables

const tools = [
  new Tool({
    name: "searchProducts",
    description: "Search for e-commerce products by keyword (e.g., 'iPhone')",
    func: searchProducts,
  }),
  new Tool({
    name: "viewCart",
    description: "View all items currently in the cart",
    func: viewCart,
  }),
  new Tool({
    name: "addToCart",
    description: "Add a product to the cart using name, price, and quantity",
    func: addToCart,
  }),
  new Tool({
    name: "removeFromCart",
    description: "Remove a product from the cart by productId",
    func: removeFromCart,
  }),
  new Tool({
    name: "clearCart",
    description: "Clear all items in the cart",
    func: clearCart,
  }),
  new Tool({
    name: "checkoutCart",
    description: "Checkout and simulate payment using Stripe",
    func: checkoutCart,
  }),
];

const model = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const executorPromise = initializeAgentExecutorWithOptions(tools, model, {
  agentType: "openai-functions",
  verbose: true,
});

export async function handlePrompt(prompt: string) {
  const executor = await executorPromise;
  const response = await executor.run({ input: prompt });
  return response;
}
