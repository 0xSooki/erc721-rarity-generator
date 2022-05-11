// Change this to the desired contract address you would like to get rarity for
const contractAddress = "CONTRACT_ADDRESS";

// Change this to the name of the collection
const collectionName = "COLLECTION_NAME";

// If you want to upload your data to the moralis cloud change this to true
const upload = false;

// Logging the upload of data to the Moralis database
const logUpload = true;

// Logging the retrieved pages of the collection
const logPages = true;

// If you would like to save the data in JSON format change this to true
const json = true;

module.exports = {
  contractAddress,
  collectionName,
  upload,
  json,
  logUpload,
  logPages,
};
