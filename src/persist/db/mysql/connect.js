import mysql from 'mysql2'
import { stdout } from 'node:process';
import { DB_URL } from '../../../utils/constants.js';

export const connectToMysql = () => {
  const { username, password, hostname, port = '3306', pathname = '/nft-rarity' } = new URL(DB_URL);
  stdout.write('[1/3] 🌱 Start Connecting to Mysql\n');
  // create the connection to database
  const connection = mysql.createConnection({
    host: hostname,
    port: port,
    user: username,
    password: password,
    database: pathname.slice(1)
  });

  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      stdout.write('[2/3] 🌱 Mysql is connected\n');
      if (error) {
        stdout.write(`❗ Mysql connection error: ${error}❗`);
        throw new Error(error);
      }
      
      connection.query('create table if not exists nfts(id int primary key auto_increment, attributes json, image VARCHAR(255), rarity VARCHAR(255), token_id VARCHAR(255))', (err, results, fields) => {
        if (err) {
          stdout.write(`❗ Mysql error: ${err}❗`);
          reject(err);
          throw new Error(err);
        }
        resolve(connection);
        stdout.write('[3/3] 🌱 Table nfts is ready\n');
      });
    });
  })
}