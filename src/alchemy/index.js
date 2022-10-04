const { Network, Alchemy } = require('alchemy-sdk');
const { CONTRACT_ADDRESS } = require('../config.js');

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
  throw new Error('ALCHEMY_API_KEY is required!');
}

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

const alchemyClient = new Alchemy(settings);

const getNFTsForCollectionOnce = async (pageKey) => {
  const response = await alchemyClient.nft.getNftsForContract(CONTRACT_ADDRESS, {
    pageKey: pageKey,
    withMetadata: true
  });

  return response;
};

const getNftsAndMetaData = async () => {
  const metadata = [];
  const allNfts = [];

  let nextPage = '';
  while (nextPage || nextPage === '') {
    const { nfts, pageKey } = await getNFTsForCollectionOnce(nextPage);

    for (const token of nfts) {
      if (token.rawMetadata.attributes) {
        metadata.push(token.rawMetadata.attributes);
        allNfts.push(token);
      }
    }
    nextPage = pageKey;
  }

  return [metadata, allNfts];
};

module.exports = { getNftsAndMetaData };
