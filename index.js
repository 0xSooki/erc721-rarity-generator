import { prepareBaseFolderStructure, connectToDatabase } from './src/persist/index.js';
import { generateRarity } from './src/main.js';

(() => {
  connectToDatabase().then(() => {
    prepareBaseFolderStructure();
    generateRarity();
  });
})();
