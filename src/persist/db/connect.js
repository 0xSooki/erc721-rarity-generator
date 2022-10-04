const mongoose = require('mongoose');
const { MONGO_DB_URL } = require('../../config');

// Setup listeners
mongoose.connection.once('open', () => {
  console.log('MongoDB is open');

  mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
  });

  mongoose.connection.on('disconnected', () => {
    console.error('MongoDB is disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB is reconnected');
  });

  mongoose.connection.on('error', (error) => {
    console.error(`MongoDB error: ${error}`);
  });
});

const connectToDatabase = () => {
  console.log('Start Connecting to MongoDB...');

  return mongoose
    .connect(MONGO_DB_URL, {
      dbName: 'nft-rarity',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch((error) => {
      console.log(`MongoDB connection error: ${error}`);
      throw new Error(error);
    });
};

module.exports = { connectToDatabase };
