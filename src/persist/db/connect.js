import mongoose from 'mongoose';
import { stdout } from 'node:process';
import { MONGO_DB_URL } from '../../utils/constants.js';

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

export const connectToDatabase = () => {
  stdout.write('[1/3] 🌱 Start Connecting to MongoDB\n');

  return mongoose
    .connect(MONGO_DB_URL, {
      dbName: 'nft-rarity',
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
