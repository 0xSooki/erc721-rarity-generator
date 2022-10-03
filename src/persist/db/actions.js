const { NftModel } = require('./schemas');

const addSingletonNFT = (nft) => {
  console.log(`Trying to insert NFT #${nft.token_id} into the DB`);

  return new NftModel(nft)
    .save()
    .then(() => {
      console.log(`${nft.token_id} has been successfully added into the DB`);
    })
    .catch((error) => console.error(error));
};

const addMultipleNFTs = (nftList) => {
  if (nftList.length === 0) {
    console.log('Received an empty list of NFTs. Doing nothing...');
    return Promise.resolve(undefined);
  }
  console.log(`Trying to insert ${nftList.length} record(s) into the DB`);

  return NftModel.insertMany(nftList)
    .then((resp) => {
      const suffix = resp.length === 1 ? 'record has' : 'records have';
      console.log(`${resp.length} ${suffix} been successfully added into the DB`);
    })
    .catch((error) => console.error(console, error));
};

module.exports = { addMultipleNFTs, addSingletonNFT };
