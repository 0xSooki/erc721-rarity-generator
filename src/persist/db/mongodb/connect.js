import mongoose from 'mongoose';
import { stdout } from 'node:process';
import { DB_URL } from '../../../utils/constants.js';

// Setup listeners
mongoose.connection.once('open', () => {
  stdout.write('[2/3] 🌱 MongoDB is open\n');

  mongoose.connection.on('connected', () => {
    stdout.write(' 🌱 MongoDB is connected\n');
  });

  mongoose.connection.on('disconnected', () => {
    stdout.write('❗ MongoDB is disconnected ❗');
  });

  mongoose.connection.on('reconnected', () => {
    stdout.write(' 🌱 MongoDB is reconnected\n');
  });

  mongoose.connection.on('error', (error) => {
    stdout.write(`❗ MongoDB error: ${error}❗`);
    throw new Error(error);
  });
});

export const connectToMongodb = () => {
  const { pathname = '/nft-rarity' } = new URL(DB_URL);
  stdout.write('[1/3] 🌱 Start Connecting to MongoDB\n');

  return mongoose
    .connect(DB_URL, {
      dbName: pathname.slice(1),
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      stdout.write('[3/3] 🌱 MongoDB is connected\n');
    })
    .catch((error) => {
      stdout.write(`❗ MongoDB connection error: ${error} ❗\n`);
      throw new Error(error);
    });
};
