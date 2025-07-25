// File: main.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { handlePrompt } from './agent.js';
// 🖼️ Fancy welcome banner
function showBanner() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const gradient = (yield import('gradient-string')).default;
        console.log(gradient.morning(figlet.textSync('HAN AI Agent', { horizontalLayout: 'default' })));
        console.log(chalk.yellow(`\n🤖 Welcome to HAN — Your E-commerce AI Agent\n`));
        console.log(chalk.cyan(`Available Commands:`));
        console.log(chalk.white(`  🔍  Search for products`));
        console.log(chalk.white(`  🛒  Add / Remove from cart`));
        console.log(chalk.white(`  📦  View or Clear cart`));
        console.log(chalk.white(`  💳  Checkout & simulate payment`));
        console.log(chalk.white(`  ❌  Type 'exit' to quit\n`));
    });
}
// 🧠 Input loop
function startAgentLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        yield showBanner();
        while (true) {
            const { userPrompt } = yield inquirer.prompt([
                {
                    type: 'input',
                    name: 'userPrompt',
                    message: chalk.greenBright('Ask HAN AI Agent:')
                }
            ]);
            if (userPrompt.trim().toLowerCase() === 'exit') {
                console.log(chalk.blue('\n👋 Exiting HAN AI Agent... Goodbye!'));
                process.exit(0);
            }
            const result = yield handlePrompt(userPrompt);
            console.log(chalk.magenta('\n🤖 Response:'), result);
            console.log(chalk.gray('\n────────────────────────────────────────────\n'));
        }
    });
}
// 🚀 Start
startAgentLoop();
