const { stdout } = require('process');
const { saveDataToJSON } = require('../persist');
const { RarityGeneratorErrors } = require('./constants');

// The project doesn't support modular imports and this version of
// inquirer is not supporting commonjs anymore hence we need to perform dynamic importing
const inquirer = import('inquirer').then(({ default: inquirer }) => inquirer);

const generatorPrompt = async () => {
  const questions = [
    {
      type: 'list',
      name: 'whatsnext',
      message: '\n❓ What would you like to do next?',
      choices: ['Print Errors', 'Save Error', 'Exit']
    }
  ];

  (await inquirer).prompt(questions).then((answers) => {
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

module.exports = { generatorPrompt };
