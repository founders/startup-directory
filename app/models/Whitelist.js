import mongoose, { Schema } from 'mongoose';

const WhitelistSchema = new Schema({
  data: {
    type: [String],
    required: true,
    default: [],
  },
  lastUpdated: {
    type: String,
    required: true,
    default: new Date().toLocaleString(),
  },
});

export default mongoose.models.Whitelist ||
  mongoose.model('Whitelist', WhitelistSchema);
