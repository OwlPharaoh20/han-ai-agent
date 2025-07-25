"use strict";
// File: main.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const agent_1 = require("./agent");
// 🖼️ Fancy welcome banner
function showBanner() {
    console.clear();
    console.log(gradient_string_1.default.morning(figlet_1.default.textSync('HAN AI Agent', { horizontalLayout: 'default' })));
    console.log(chalk_1.default.yellow(`\n🤖 Welcome to HAN — Your E-commerce AI Agent\n`));
    console.log(chalk_1.default.cyan(`Available Commands:`));
    console.log(chalk_1.default.white(`  🔍  Search for products`));
    console.log(chalk_1.default.white(`  🛒  Add / Remove from cart`));
    console.log(chalk_1.default.white(`  📦  View or Clear cart`));
    console.log(chalk_1.default.white(`  💳  Checkout & simulate payment`));
    console.log(chalk_1.default.white(`  ❌  Type 'exit' to quit\n`));
}
// 🧠 Input loop
async function startAgentLoop() {
    showBanner();
    while (true) {
        const { userPrompt } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'userPrompt',
                message: chalk_1.default.greenBright('Ask HAN AI Agent:')
            }
        ]);
        if (userPrompt.trim().toLowerCase() === 'exit') {
            console.log(chalk_1.default.blue('\n👋 Exiting HAN AI Agent... Goodbye!'));
            process.exit(0);
        }
        const result = await (0, agent_1.handlePrompt)(userPrompt);
        console.log(chalk_1.default.magenta('\n🤖 Response:'), result);
        console.log(chalk_1.default.gray('\n────────────────────────────────────────────\n'));
    }
}
// 🚀 Start
startAgentLoop();
