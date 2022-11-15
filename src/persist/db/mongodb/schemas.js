import mongoose from 'mongoose';

const NftSchema = new mongoose.Schema({
  attributes: {
    type: Array,
    required: true,
    default: []
  },
  image: {
    type: String,
    required: false
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

export const NftModel = mongoose.model('nft', NftSchema);
