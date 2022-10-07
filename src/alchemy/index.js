import { Network, Alchemy } from 'alchemy-sdk';
import { ALCHEMY_API_KEY, CONTRACT_ADDRESS } from '../utils/constants.js';

const settings = {
  apiKey: ALCHEMY_API_KEY,
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

export const getNftsAndMetaData = async () => {
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
