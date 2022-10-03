const mongoose = require('mongoose');

const NftSchema = new mongoose.Schema({
  attributes: {
    type: Array,
    required: true,
    default: []
  },
  image: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    required: true
  },
  token_id: {
    type: String,
    required: true
  }
});

const NftModel = mongoose.model('nft', NftSchema);

module.exports = { NftModel };
