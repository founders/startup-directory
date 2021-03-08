import mongoose, { Schema } from 'mongoose';

const PositionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

  module.exports = mongoose.models.PositionSchema || mongoose.model('position', PositionSchema);