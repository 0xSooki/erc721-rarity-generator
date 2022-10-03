const basePath = process.cwd();

const { buildSetupFolder } = require(`${basePath}/src/persist`);
const { generateRarity } = require(`${basePath}/src/main.js`);

(() => {
  buildSetupFolder();
  generateRarity();
})();
