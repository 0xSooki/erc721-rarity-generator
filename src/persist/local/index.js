import fs from 'node:fs';
import { stdout } from 'node:process';
import {
  CALCULATIONS_DIR,
  ERRORS_DIR,
  ERROR_FILE_NAME,
  CALCULATIONS_FILE_NAME,
  NFT_DIR,
  NFT_FILE_NAME
} from '../../utils/constants.js';
import { getTimestamp } from '../../utils/index.js';
import { compressDataTo } from './compressor.js';

const REQUIRED_FOLDERS = [
  { name: 'NFT Data folder', path: NFT_DIR },
  { name: 'Calculations Folder', path: CALCULATIONS_DIR },
  { name: 'Errors Folder', path: ERRORS_DIR }
];
const TOTAL_BUILD_STEPS = REQUIRED_FOLDERS.length + 1;

export const prepareBaseFolderStructure = () => {
  stdout.write(`\n[1/${TOTAL_BUILD_STEPS}] 🔧 Preparing to build folder structure\n`);

  REQUIRED_FOLDERS.forEach(({ name, path }, index) => {
    const currentBuildStep = index + 2;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      stdout.write(`[${currentBuildStep}/${TOTAL_BUILD_STEPS}] 📂 ${name} has been created\n`);
    } else {
      stdout.write(
        `[${currentBuildStep}/${TOTAL_BUILD_STEPS}] 📁 ${name} exist. Skipping this step\n`
      );
    }
  });
};

export const saveDataToJson = (data, path, fileName) => {
  const stringifiedData = JSON.stringify(data, null, 2);

  fs.writeFileSync(`${path}/${fileName}.json`, stringifiedData);
  stdout.write(`\n💾 Your data has been saved to ${path}/${fileName}.json\n`);
};

export const saveErrorsToJson = (data) => {
  const timestamp = getTimestamp();
  const fileName = `${ERROR_FILE_NAME}-${timestamp}`;

  saveDataToJson(data, ERRORS_DIR, fileName);
};

export const saveErrorsToZip = (data) => {
  const timestamp = getTimestamp();
  const fileName = `${ERROR_FILE_NAME}-${timestamp}`;

  compressDataTo(data, ERRORS_DIR, fileName);
};

export const saveNFTsToJson = (data) => {
  const timestamp = getTimestamp();
  const fileName = `${NFT_FILE_NAME}-${timestamp}`;

  saveDataToJson(data, NFT_DIR, fileName);
};

export const saveNFTsToZip = (data) => {
  const timestamp = getTimestamp();
  const fileName = `${NFT_FILE_NAME}-${timestamp}`;

  compressDataTo(data, NFT_DIR, fileName);
};

export const saveCalculationsToJson = (data) => {
  const timestamp = getTimestamp();
  const fileName = `${CALCULATIONS_FILE_NAME}-${timestamp}`;

  saveDataToJson(data, CALCULATIONS_DIR, fileName);
};

export const saveCalculationsToZip = (data) => {
  const timestamp = getTimestamp();
  const fileName = `${CALCULATIONS_FILE_NAME}-${timestamp}`;

  compressDataTo(data, CALCULATIONS_DIR, fileName);
};

export const saveCalculationToZip = (data) => {
  const timestamp = getTimestamp();
  const fileName = `${CALCULATIONS_FILE_NAME}-${timestamp}`;

  compressDataTo(data, CALCULATIONS_DIR, fileName);
};
