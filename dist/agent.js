var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    ["system", "You are a helpful shopping assistant."],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
]);
export function handlePrompt(promptText) {
    return __awaiter(this, void 0, void 0, function* () {
        const agent = yield createOpenAIFunctionsAgent({
            llm: model,
            tools,
            prompt,
        });
        const agentExecutor = new AgentExecutor({
            agent,
            tools,
            verbose: true,
        });
        const response = yield agentExecutor.invoke({ input: promptText });
        return response.output;
    });
}
