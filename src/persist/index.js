const fs = require('fs');
const { fileName: defaultFileName } = require('../config.js');

const basePath = process.cwd();
const BUILD_DIR = `${basePath}/build`;
const JSON_DIR = `${BUILD_DIR}/json`;

const buildSetupFolder = () => {
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmdirSync(BUILD_DIR, { recursive: true });
  }
  fs.mkdirSync(BUILD_DIR);
  fs.mkdirSync(JSON_DIR);
};

const saveData = (data, fileName = defaultFileName) => {
  const stringifiedData = JSON.stringify(data);

  fs.writeFileSync(`${JSON_DIR}/${fileName}.json`, stringifiedData);
  console.info(`${fileName}.json saved at ${JSON_DIR}`);
  return true;
};

module.exports = { buildSetupFolder, saveData };
