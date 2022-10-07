import dotenv from 'dotenv';
dotenv.config();

import { createErrorContainer } from './errorContainer.js';
import { createSpinner } from './spinner.js';

export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
  throw new Error('ALCHEMY_API_KEY is required!');
}

export const CONTRACT_ADDRESS = process.env['CONTRACT_ADDRESS'];

if (!CONTRACT_ADDRESS) {
  throw new Error(`${CONTRACT_ADDRESS} must be defined!`);
}

export const MONGO_DB_URL = process.env.MONGO_DB_URL;

if (!MONGO_DB_URL) {
  throw new Error(`${MONGO_DB_URL} must be defined!`);
}

export const FILE_NAME = process.env['FILE_NAME'] || 'nft-data';

export const RarityGeneratorSpinner = createSpinner('Rarity generator');
export const RarityGeneratorErrors = createErrorContainer();
