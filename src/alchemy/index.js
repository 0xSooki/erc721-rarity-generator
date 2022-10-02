const { Network, Alchemy } = require('alchemy-sdk');

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
  throw new Error('ALCHEMY_API_KEY is required!');
}

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

const alchemyClient = new Alchemy(settings);

module.exports = { alchemyClient };
