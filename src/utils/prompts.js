import inquirer from 'inquirer';
import { stdout } from 'node:process';
import { generateRarity } from '../calculations/index.js';
import {
  saveErrorsToJson,
  saveErrorsToZip,
  saveCalculationsToJson,
  saveCalculationsToZip,
  insertManyNftsToDatabase,
  saveNFTsToJson,
  saveNFTsToZip
} from '../persist/index.js';
import { CONTRACT_ADDRESS, RarityGeneratorData, RarityGeneratorErrors } from './constants.js';

const MAIN_MENU = 'mainMenu';
const CONTRACT_SETUP_MENU = 'calculationsMenu';
const CUSTOM_CONTRACT_MENU = 'customContractMenu';
const POST_CALCULATION_SETUP_MENU = 'postCalculationsMenu';

const NoNFTDataErrorMessage = '⚠️  No nft data stored ⚠️ \n';
const NoCalculatedDataErrorMessage = '⚠️  No calculations data stored ⚠️ \n';
const ExitAppMessage = '\n👋 Closing the application. Bye\n';

const BackToMainMenuPoint = '⬅️  Back to Main Menu';
const ExitApplicationMenuPoint = '🚪 Exit Application';

const MainMenuPromptOptions = {
  CalculateRarity: '⏳ Calculate Rarity',
  ExitApplication: ExitApplicationMenuPoint
};

export function mainMenuPrompt() {
  const questions = [
    {
      type: 'list',
      name: MAIN_MENU,
      message: '\n🎛️  Main Menu',
      choices: Object.values(MainMenuPromptOptions)
    }
  ];

  inquirer.prompt(questions).then((answers) => {
    const selected = answers[MAIN_MENU];

    switch (selected) {
      case MainMenuPromptOptions.CalculateRarity:
        contractSetupPrompt();
        break;
      case MainMenuPromptOptions.ExitApplication:
        stdout.write(ExitAppMessage);
        process.exit(0);
        break;

      default:
        mainMenuPrompt();
        break;
    }
  });
}

export function customContractPrompt() {
  const questions = [
    {
      type: 'input',
      name: CUSTOM_CONTRACT_MENU,
      message: '\n📓 Type in your contract address',
      default() {
        return CONTRACT_ADDRESS;
      },
      choices: Object.values(CalculationsPromptOptions)
    }
  ];

  inquirer.prompt(questions).then((answers) => {
    const answer = answers[CUSTOM_CONTRACT_MENU];

    generateRarity(answer);
  });
}

const CalculationsPromptOptions = {
  UseDefaultContract: '📗 Use Default Contract',
  UseCustomContract: '📙 Use Custom Contract',
  BackToMainMenu: BackToMainMenuPoint
};

export function contractSetupPrompt() {
  const questions = [
    {
      type: 'list',
      name: CONTRACT_SETUP_MENU,
      message: '\n⚙️  Contract Setup',
      choices: Object.values(CalculationsPromptOptions)
    }
  ];

  inquirer.prompt(questions).then((answers) => {
    const selected = answers[CONTRACT_SETUP_MENU];

    switch (selected) {
      case CalculationsPromptOptions.UseDefaultContract:
        generateRarity(CONTRACT_ADDRESS);
        break;

      case CalculationsPromptOptions.UseCustomContract:
        customContractPrompt();
        break;

      case CalculationsPromptOptions.BackToMainMenu:
        mainMenuPrompt();
        break;

      default:
        contractSetupPrompt();
        break;
    }
  });
}

const PostCalculationPromptOptions = {
  SaveCalculationsToDB: '💾 Save Calculations (DB)',
  SaveCalculationToJson: '💾 Save Calculations (JSON)',
  SaveCalculationToZip: '💾 Save Calculations (ZIP)',
  SaveNFTDataToJson: '💾 Save NFT Data (JSON)',
  SaveNFTDataToZip: '💾 Save NFT Data (ZIP)',
  PrintErrors: '✏️  Print Errors',
  SaveErrorsToJson: '💾 Save Errors (JSON)',
  SaveErrorsToZip: '💾 Save Errors (ZIP)',
  BackToMainMenu: BackToMainMenuPoint,
  ExitApplication: ExitApplicationMenuPoint
};

export function postCalculationPrompt() {
  const questions = [
    {
      type: 'list',
      name: POST_CALCULATION_SETUP_MENU,
      message: '\n💻 Calculation has been finished',
      choices: Object.values(PostCalculationPromptOptions)
    }
  ];

  inquirer.prompt(questions).then(async (answers) => {
    const selected = answers[POST_CALCULATION_SETUP_MENU];

    switch (selected) {
      case PostCalculationPromptOptions.SaveCalculationsToDB:
        if (RarityGeneratorData.hasCalculationData()) {
          await insertManyNftsToDatabase(RarityGeneratorData.getCalculationData());
        } else {
          return stdout.write(NoCalculatedDataErrorMessage);
        }
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.SaveCalculationToJson:
        if (RarityGeneratorData.hasCalculationData()) {
          saveCalculationsToJson(RarityGeneratorData.getCalculationData());
        } else {
          return stdout.write(NoCalculatedDataErrorMessage);
        }
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.SaveCalculationToZip:
        if (RarityGeneratorData.hasCalculationData()) {
          saveCalculationsToZip(RarityGeneratorData.getCalculationData());
        } else {
          return stdout.write(NoCalculatedDataErrorMessage);
        }
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.SaveNFTDataToJson:
        if (RarityGeneratorData.hasNftData()) {
          saveNFTsToJson(RarityGeneratorData.getNftData());
        } else {
          return stdout.write(NoNFTDataErrorMessage);
        }
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.SaveNFTDataToZip:
        if (RarityGeneratorData.hasNftData()) {
          saveNFTsToZip(RarityGeneratorData.getNftData());
        } else {
          return stdout.write(NoNFTDataErrorMessage);
        }
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.PrintErrors:
        RarityGeneratorErrors.printErrors();
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.SaveErrorsToJson:
        if (RarityGeneratorErrors.hasError()) {
          saveErrorsToJson(RarityGeneratorErrors.getErrors());
        } else {
          RarityGeneratorErrors.printErrors();
        }
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.SaveErrorsToZip:
        if (RarityGeneratorErrors.hasError()) {
          saveErrorsToZip(RarityGeneratorErrors.getErrors());
        } else {
          RarityGeneratorErrors.printErrors();
        }
        postCalculationPrompt();
        break;

      case PostCalculationPromptOptions.BackToMainMenu:
        RarityGeneratorErrors.cleanErrors();
        RarityGeneratorData.cleanData();
        mainMenuPrompt();
        break;

      case PostCalculationPromptOptions.ExitApplication:
        stdout.write(ExitAppMessage);
        process.exit(0);
        break;

      default:
        postCalculationPrompt();
        break;
    }
  });
}
