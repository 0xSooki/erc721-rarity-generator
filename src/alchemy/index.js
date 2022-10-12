import { Network, Alchemy } from 'alchemy-sdk';
import { ALCHEMY_API_KEY } from '../utils/constants.js';

const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

const alchemyClient = new Alchemy(settings);

const getNFTsForCollectionOnce = async (contractAddress, pageKey) => {
  const response = await alchemyClient.nft.getNftsForContract(contractAddress, {
    pageKey,
    withMetadata: true
  });

  return response;
};

export const getNftsAndMetaData = async (contractAddress) => {
  const metadata = [];
  const allNfts = [];

  let nextPage = '';
  while (nextPage || nextPage === '') {
    const { nfts, pageKey } = await getNFTsForCollectionOnce(contractAddress, nextPage);

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
