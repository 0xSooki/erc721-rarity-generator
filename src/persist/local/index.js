import fs from 'node:fs';
import { stdout } from 'node:process';
import { FILE_NAME } from '../../utils/constants.js';

const BASE_PATH = process.cwd();
const NFT_DIR = `${BASE_PATH}/nfts`;
const CALCULATIONS_DIR = `${BASE_PATH}/calculations`;
const ERRORS_DIR = `${BASE_PATH}/errors`;

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

export const saveDataToJSON = (data, path, fileName = FILE_NAME) => {
  const stringifiedData = JSON.stringify(data, null, 2);

  fs.writeFileSync(`${path}/${fileName}.json`, stringifiedData);
  stdout.write(`\n💾 Your data has been saved to ${path}/${fileName}.json\n`);
};
