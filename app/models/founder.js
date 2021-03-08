import mongoose, { Schema } from 'mongoose';

const FounderSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    position: {
        type: String,
        required: true
    },
    headshotURL: {
      type: String,
      required: false
    }
  });

  module.exports = mongoose.models.FounderSchema || mongoose.model('founder', FounderSchema);
  
  