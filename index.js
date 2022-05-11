const basePath = process.cwd();
const { generateRarity, buildSetup } = require(`${basePath}/src/main.js`);

(() => {
  buildSetup();
  generateRarity();
})();
