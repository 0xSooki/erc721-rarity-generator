import { prepareBaseFolderStructure, connectToDatabase } from './src/persist/index.js';
import { mainMenuPrompt } from './src/utils/prompts.js';

(() => {
  connectToDatabase().then(() => {
    prepareBaseFolderStructure();
    mainMenuPrompt();
  });
})();
