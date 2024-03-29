import inquirer from 'inquirer';
import { stdout } from 'node:process';
import { saveDataToJSON } from '../persist/index.js';
import { RarityGeneratorErrors } from './constants.js';

export const generatorPrompt = () => {
  const questions = [
    {
      type: 'list',
      name: 'whatsnext',
      message: '\n❓ What would you like to do next?',
      choices: ['Print Errors', 'Save Error', 'Exit']
    }
  ];

  inquirer.prompt(questions).then((answers) => {
    const selected = answers['whatsnext'];

    switch (selected) {
      case 'Print Errors':
        RarityGeneratorErrors.printErrors();
        generatorPrompt();
        break;
      case 'Save Error':
        if (RarityGeneratorErrors.hasError()) {
          saveDataToJSON(RarityGeneratorErrors.getErrors(), 'nft-errors');
        } else {
          RarityGeneratorErrors.printErrors();
        }
        generatorPrompt();
        break;
      case 'Exit':
        stdout.write('\n👋 Closing the application. Bye\n');
        process.exit(0);
        break;
      default:
        generatorPrompt();
        break;
    }
  });
};
