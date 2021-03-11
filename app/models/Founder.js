import mongoose, { Schema } from 'mongoose';

const FounderSchema = new Schema({
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
});

export default mongoose.models.Founder ||
  mongoose.model('Founder', FounderSchema);
