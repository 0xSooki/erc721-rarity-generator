import dotenv from 'dotenv';
dotenv.config();

import { createDataStorage } from './dataStorage.js';
import { ErrorStorage } from './errorStorage.js';
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

export const RarityGeneratorData = createDataStorage();
export const RarityGeneratorErrors = new ErrorStorage();
export const RarityGeneratorSpinner = createSpinner('Rarity generator');

const BASE_PATH = process.cwd();
export const NFT_DIR = `${BASE_PATH}/nfts`;
export const NFT_FILE_NAME = 'NFT-Data';
export const CALCULATIONS_DIR = `${NFT_DIR}/calculations`;
export const CALCULATIONS_FILE_NAME = process.env['FILE_NAME'] || 'NFT-Calculations';
export const ERRORS_DIR = `${NFT_DIR}/errors`;
export const ERROR_FILE_NAME = 'Error';
