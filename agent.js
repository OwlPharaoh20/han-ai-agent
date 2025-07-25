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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrompt = handlePrompt;
var openai_1 = require("@langchain/openai");
var agents_1 = require("langchain/agents");
var dotenv_1 = require("dotenv");
var product_search_1 = require("./tools/product_search");
var cart_1 = require("./tools/cart");
var checkout_1 = require("./tools/checkout");
(0, dotenv_1.config)(); // Load .env variables
var tools = [
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
var model = new openai_1.ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
});
var executorPromise = (0, agents_1.initializeAgentExecutorWithOptions)(tools, model, {
    agentType: "openai-functions",
    verbose: true,
});
function handlePrompt(prompt) {
    return __awaiter(this, void 0, void 0, function () {
        var executor, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, executorPromise];
                case 1:
                    executor = _a.sent();
                    return [4 /*yield*/, executor.run({ input: prompt })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
