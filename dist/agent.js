"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrompt = handlePrompt;
const openai_1 = require("@langchain/openai");
const tools_1 = require("@langchain/core/tools");
const agents_1 = require("langchain/agents");
const prompts_1 = require("@langchain/core/prompts");
const dotenv_1 = require("dotenv");
const product_search_1 = require("./tools/product_search");
const cart_1 = require("./tools/cart");
const checkout_1 = require("./tools/checkout");
(0, dotenv_1.config)(); // Load .env variables
const tools = [
    new tools_1.DynamicTool({
        name: "searchProducts",
        description: "Search for e-commerce products by keyword (e.g., 'iPhone')",
        func: product_search_1.searchProducts,
    }),
    new tools_1.DynamicTool({
        name: "viewCart",
        description: "View all items currently in the cart",
        func: cart_1.viewCart,
    }),
    new tools_1.DynamicTool({
        name: "addToCart",
        description: "Add a product to the cart using name, price, and quantity",
        func: cart_1.addToCart,
    }),
    new tools_1.DynamicTool({
        name: "removeFromCart",
        description: "Remove a product from the cart by productId",
        func: cart_1.removeFromCart,
    }),
    new tools_1.DynamicTool({
        name: "clearCart",
        description: "Clear all items in the cart",
        func: cart_1.clearCart,
    }),
    new tools_1.DynamicTool({
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
const prompt = prompts_1.ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful shopping assistant."],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
]);
function handlePrompt(promptText) {
    return __awaiter(this, void 0, void 0, function* () {
        const agent = yield (0, agents_1.createOpenAIFunctionsAgent)({
            llm: model,
            tools,
            prompt,
        });
        const agentExecutor = new agents_1.AgentExecutor({
            agent,
            tools,
            verbose: true,
        });
        const response = yield agentExecutor.invoke({ input: promptText });
        return response.output;
    });
}
