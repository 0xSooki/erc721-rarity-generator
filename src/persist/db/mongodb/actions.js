import { stdout } from 'node:process';
import { NftModel } from './schemas.js';

export const addSingletonToMongodb = (nft) => {
  stdout.write(`\n👉 Trying to insert NFT #${nft.token_id} into the DB\n`);

  return new NftModel(nft)
    .save()
    .then(() => {
      stdout.write(`🌟 ${nft.token_id} has been successfully added into the DB\n`);
    })
    .catch((error) => stdout.write(`❗ ${error}❗\n`));
};

export const addMultipleToMongodb = (nftList) => {
  if (nftList.length === 0) {
    stdout.write('🔴 Received an empty list of NFTs. Doing nothing...\n');
    return Promise.resolve(undefined);
  }
  stdout.write(`\n👉 Trying to insert ${nftList.length} record(s) into the DB\n`);

  return NftModel.insertMany(nftList)
    .then((resp) => {
      const suffix = resp.length === 1 ? 'record has' : 'records have';
      stdout.write(`🌟 ${resp.length} ${suffix} been successfully added into the DB\n`);
    })
    .catch((error) => stdout.write(`❗ ${error} ❗\n`));
};
