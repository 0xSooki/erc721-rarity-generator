require('dotenv').config();

const { createErrorContainer } = require('./errorContainer');
const { createSpinner } = require('./spinner');

const CONTRACT_ADDRESS = process.env['CONTRACT_ADDRESS'];

if (!CONTRACT_ADDRESS) {
  throw new Error(`${CONTRACT_ADDRESS} must be defined!`);
}

const MONGO_DB_URL = process.env.MONGO_DB_URL;

if (!MONGO_DB_URL) {
  throw new Error(`${MONGO_DB_URL} must be defined!`);
}

const FILE_NAME = process.env['FILE_NAME'] || 'nft-data';

const RarityGeneratorSpinner = createSpinner('Rarity generator');
const RarityGeneratorErrors = createErrorContainer();

module.exports = {
  CONTRACT_ADDRESS,
  FILE_NAME,
  MONGO_DB_URL,
  RarityGeneratorSpinner,
  RarityGeneratorErrors
};
