const fs = require('fs');
const { FILE_NAME } = require('../../config.js');

const basePath = process.cwd();
const BUILD_DIR = `${basePath}/build`;
const JSON_DIR = `${BUILD_DIR}/json`;

const buildSetupFolder = () => {
  console.log('Building folder structure');
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true });
  }
  fs.mkdirSync(BUILD_DIR);
  fs.mkdirSync(JSON_DIR);
};

const saveDataToJSON = (data, fileName = FILE_NAME) => {
  const stringifiedData = JSON.stringify(data, null, 2);

  fs.writeFileSync(`${JSON_DIR}/${fileName}.json`, stringifiedData);
  console.info(`${fileName}.json saved at ${JSON_DIR}`);
  return true;
};

module.exports = { buildSetupFolder, saveDataToJSON };
