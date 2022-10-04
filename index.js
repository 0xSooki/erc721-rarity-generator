require('dotenv').config();

const { buildSetupFolder, connectToDatabase } = require('./src/persist');
const { generateRarity } = require('./src/main');

(() => {
  connectToDatabase().then(() => {
    buildSetupFolder();
    generateRarity();
  });
})();
