import mongoose, { Schema } from 'mongoose';

const FounderSchema = new Schema({
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
});

export default mongoose.models.Founder ||
  mongoose.model('Founder', FounderSchema);
