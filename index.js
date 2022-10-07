import { buildSetupFolder, connectToDatabase } from './src/persist/index.js';
import { generateRarity } from './src/main.js';

(() => {
  connectToDatabase().then(() => {
    buildSetupFolder();
    generateRarity();
  });
})();
