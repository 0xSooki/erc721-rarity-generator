import { DB_URL } from '../../utils/constants.js';
import { connectToMysql } from '../db/mysql/connect.js';
import { connectToMongodb } from '../db/mongodb/connect.js';
import { addSingletonToMysql, addMultipleToMysql } from '../db/mysql/actions.js';
import { addSingletonToMongodb, addMultipleToMongodb } from '../db/mongodb/actions.js';

export const connectToDatabase = () => {
  const { protocol } = new URL(DB_URL);
  let dbBase;
  switch (protocol) {
    case 'mysql:':
      dbBase = connectToMysql
      break;
    case 'mongodb:':
      dbBase = connectToMongodb
      break;
  }
  return dbBase();
}

export const addSingletonNFT = (db, nft) => {
  const { protocol } = new URL(DB_URL);
  let action;
  switch (protocol) {
    case 'mysql:':
      action = addSingletonToMysql(db, nft)
      break;
    case 'mongodb:':
      action = addSingletonToMongodb(nft)
      break;
  }
  return action;
}

export const addMultipleNFTs = (db, nftArr) => {
  const { protocol } = new URL(DB_URL);
  let action;
  switch (protocol) {
    case 'mysql:':
      action = addMultipleToMysql(db, nftArr)
      break;
    case 'mongodb:':
      action = addMultipleToMongodb(nftArr)
      break;
  }
  return action;
}