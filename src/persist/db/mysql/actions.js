import { stdout } from 'node:process';

export const addSingletonToMysql = (db, nft) => {
  stdout.write(`\n👉 Trying to insert NFT #${nft.token_id} into the DB\n`);
  const insertsql = `insert into nfts(attributes, rarity, token_id, image) values(?,?,?,?)`;

  // attributes converted to strings
  const strNft = Object.values(Object.assign(nft, { attributes: JSON.stringify(nft.attributes) }));

  return new Promise((resolve, reject) => {
    db.query(insertsql, strNft, (error) => {
      if (error) {
        reject(error);
        stdout.write(`❗ ${error}❗\n`);
        throw new Error(error);
      }
      resolve();
      stdout.write(`🌟 ${nft.token_id} has been successfully added into the DB\n`);
    });
  });
};

export const addMultipleToMysql = (db, nftList) => {
  if (nftList.length === 0) {
    stdout.write('🔴 Received an empty list of NFTs. Doing nothing...\n');
    return Promise.resolve(undefined);
  }
  stdout.write(`\n👉 Trying to insert ${nftList.length} record(s) into the DB\n`);
  const insertsql = `insert into nfts(attributes, rarity, token_id, image) values ?`;

  // attributes converted to strings
  const strNftList = nftList.map(item => {
    item.attributes = JSON.stringify(item.attributes);
    return Object.values(item);
  });

  return new Promise((resolve, reject) => {
    db.query(insertsql, [strNftList], (error) => {
      if (error) {
        reject(error);
        stdout.write(`❗ ${error}❗\n`);
        throw new Error(error);
      }
      resolve();
      stdout.write(`🌟 nftList has been successfully added into the DB\n`);
    });
  });
};
