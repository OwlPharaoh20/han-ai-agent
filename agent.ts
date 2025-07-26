import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { config } from "dotenv";
import { searchProducts } from "./tools/product_search.js";
import { viewCart, addToCart, removeFromCart, clearCart } from "./tools/cart.js";
import { checkoutCart } from "./tools/checkout.js";

config(); // Load .env variables

const tools = [
  new DynamicTool({
    name: "searchProducts",
    description: "Search for e-commerce products by keyword (e.g., 'iPhone')",
    func: searchProducts,
  }),
  new DynamicTool({
    name: "viewCart",
    description: "View all items currently in the cart",
    func: viewCart,
  }),
  new DynamicTool({
    name: "addToCart",
    description: "Add a product to the cart using name, price, and quantity",
    func: addToCart,
  }),
  new DynamicTool({
    name: "removeFromCart",
    description: "Remove a product from the cart by productId",
    func: removeFromCart,
  }),
  new DynamicTool({
    name: "clearCart",
    description: "Clear all items in the cart",
    func: clearCart,
  }),
  new DynamicTool({
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

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful shopping assistant. When a user asks to view their cart, use the viewCart tool. When they want to search for products, use the searchProducts tool. Always provide helpful responses and use the appropriate tools when needed."],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

export async function handlePrompt(promptText: string) {
  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    tools,
    prompt,
  });
  
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
    returnIntermediateSteps: false,
  });
  
  try {
    const response = await agentExecutor.invoke({ input: promptText });
    return response.output || "I couldn't process your request. Please try again.";
  } catch (error) {
    console.error("Agent error:", error);
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
}