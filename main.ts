// File: main.ts

import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { handlePrompt } from './agent.js';

// 🖼️ Fancy welcome banner
async function showBanner() {
  console.clear();
  const gradient = (await import('gradient-string')).default;
  console.log(
    gradient.morning(
      figlet.textSync('HAN AI Agent', { horizontalLayout: 'default' })
    )
  );

  console.log(
    chalk.yellow(`\n🤖 Welcome to HAN — Your E-commerce AI Agent\n`)
  );

  console.log(
    chalk.cyan(`Available Commands:`)
  );
  console.log(chalk.white(`  🔍  Search for products`));
  console.log(chalk.white(`  🛒  Add / Remove from cart`));
  console.log(chalk.white(`  📦  View or Clear cart`));
  console.log(chalk.white(`  💳  Checkout & simulate payment`));
  console.log(chalk.white(`  ❌  Type 'exit' to quit\n`));
}

// 🧠 Input loop
async function startAgentLoop() {
  await showBanner();

  while (true) {
    const { userPrompt } = await inquirer.prompt([
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

    const result = await handlePrompt(userPrompt);
    console.log(chalk.magenta('\n🤖 Response:'), result);
    console.log(chalk.gray('\n────────────────────────────────────────────\n'));
  }
}

// 🚀 Start
startAgentLoop();
