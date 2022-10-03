const { connectToDatabase } = require('./db/connect');
const { addMultipleNFTs, addSingletonNFT } = require('./db/actions');
const { buildSetupFolder, saveDataToJSON } = require('./local');

module.exports = {
  addMultipleNFTs,
  addSingletonNFT,
  buildSetupFolder,
  connectToDatabase,
  saveDataToJSON
};
