const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  token_id: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  attributes: {
    type: Array,
    required: true,
    default: []
  }
});

const nftModel = mongoose.model('nft', nftSchema);

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';

// connect to mongo
console.log('Connecting to MongoDB');
mongoose
  .connect(`${MONGODB_URL}`, {
    dbName: 'nft',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to ${MONGODB_URL}`);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const addNFT = async (nft) => {
  console.log(`Adding NFT ${nft.token_id} to DB`);
  const newNFT = new nftModel(nft);
  await newNFT.save();
};

module.exports = { db, addNFT, nftModel };
