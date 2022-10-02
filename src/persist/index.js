const fs = require('fs');
const { fileName: defaultFileName } = require('../config.js');

const basePath = process.cwd();
const buildDir = `${basePath}/build`;

const buildSetupFolder = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
};

const saveData = (data, fileName = defaultFileName) => {
  const stringifiedData = JSON.stringify(data);

  fs.writeFileSync(`${buildDir}/json/${fileName}.json`, stringifiedData);
  console.info(`${fileName}.json saved at ${basePath}/build/json`);
  return true;
};

module.exports = { buildSetupFolder, saveData };
