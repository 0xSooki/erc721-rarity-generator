import inquirer from 'inquirer';
import { stdout } from 'node:process';
import {
  saveErrorsToJson,
  saveErrorsToZip,
  saveCalculationsToJson,
  saveCalculationsToZip,
  insertManyNftsToDatabase,
  saveNFTsToJson,
  saveNFTsToZip
} from '../persist/index.js';
import { RarityGeneratorData, RarityGeneratorErrors } from './constants.js';

const GeneratorPromptOptions = {
  SaveCalculationsToDB: 'Save Errors (DB)',
  SaveCalculationToJson: 'Save Calculation (JSON)',
  SaveCalculationToZip: 'Save Calculation (ZIP)',
  SaveNFTDataToJson: 'Save NFT Data (JSON)',
  SaveNFTDataToZip: 'Save NFT Data (ZIP)',
  PrintErrors: 'Print Errors',
  SaveErrorsToJson: 'Save Errors (JSON)',
  SaveErrorsToZip: 'Save Errors (ZIP)',
  Exit: 'Exit'
};

export const generatorPrompt = () => {
  const questions = [
    {
      type: 'list',
      name: 'whatsnext',
      message: '\n❓ What would you like to do next?',
      choices: Object.values(GeneratorPromptOptions)
    }
  ];

  inquirer.prompt(questions).then(async (answers) => {
    const selected = answers['whatsnext'];

    switch (selected) {
      case GeneratorPromptOptions.SaveCalculationsToDB:
        if (RarityGeneratorData.hasCalculationData()) {
          await insertManyNftsToDatabase(RarityGeneratorData.getCalculationData());
        } else {
          return stdout.write('⚠️  No calculations data stored ⚠️ \n');
        }
        generatorPrompt();
        break;

      case GeneratorPromptOptions.SaveCalculationToJson:
        if (RarityGeneratorData.hasCalculationData()) {
          saveCalculationsToJson(RarityGeneratorData.getCalculationData());
        } else {
          return stdout.write('⚠️  No calculations data stored ⚠️ \n');
        }
        generatorPrompt();
        break;

      case GeneratorPromptOptions.SaveCalculationToZip:
        if (RarityGeneratorData.hasCalculationData()) {
          saveCalculationsToZip(RarityGeneratorData.getCalculationData());
        } else {
          return stdout.write('⚠️  No calculations data stored ⚠️ \n');
        }
        generatorPrompt();
        break;

      case GeneratorPromptOptions.SaveNFTDataToJson:
        if (RarityGeneratorData.hasNftData()) {
          saveNFTsToJson(RarityGeneratorData.getNftData());
        } else {
          return stdout.write('⚠️  No nft data stored ⚠️ \n');
        }
        generatorPrompt();
        break;

      case GeneratorPromptOptions.SaveNFTDataToZip:
        if (RarityGeneratorData.hasNftData()) {
          saveNFTsToZip(RarityGeneratorData.getNftData());
        } else {
          return stdout.write('⚠️  No nft data stored ⚠️ \n');
        }
        generatorPrompt();
        break;

      case GeneratorPromptOptions.PrintErrors:
        RarityGeneratorErrors.printErrors();
        generatorPrompt();
        break;

      case GeneratorPromptOptions.SaveErrorsToJson:
        if (RarityGeneratorErrors.hasError()) {
          saveErrorsToJson(RarityGeneratorErrors.getErrors());
        } else {
          RarityGeneratorErrors.printErrors();
        }
        generatorPrompt();
        break;

      case GeneratorPromptOptions.SaveErrorsToZip:
        if (RarityGeneratorErrors.hasError()) {
          saveErrorsToZip(RarityGeneratorErrors.getErrors());
        } else {
          RarityGeneratorErrors.printErrors();
        }
        generatorPrompt();
        break;

      case GeneratorPromptOptions.Exit:
        stdout.write('\n👋 Closing the application. Bye\n');
        process.exit(0);
        break;

      default:
        generatorPrompt();
        break;
    }
  });
};
