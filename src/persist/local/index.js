import fs from 'node:fs';
import { stdout } from 'node:process';
import { FILE_NAME } from '../../utils/constants.js';

const basePath = process.cwd();
const BUILD_DIR = `${basePath}/build`;
const JSON_DIR = `${BUILD_DIR}/json`;

export const buildSetupFolder = () => {
  stdout.write('\n🔧 Building folder structure\n');
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true });
  }
  fs.mkdirSync(BUILD_DIR);
  fs.mkdirSync(JSON_DIR);
};

export const saveDataToJSON = (data, fileName = FILE_NAME) => {
  const stringifiedData = JSON.stringify(data, null, 2);

  fs.writeFileSync(`${JSON_DIR}/${fileName}.json`, stringifiedData);
  stdout.write(`\n💾 Your data has been saved to ${JSON_DIR}/${fileName}.json\n`);
};
