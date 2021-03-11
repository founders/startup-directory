import mongoose, { Schema } from 'mongoose';
import Founder from './Founder';

const FounderSchema = Founder.schema;

const OrgSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  founded: {
    type: Date,
    required: true,
  },
  founders: {
    type: [FounderSchema],
    default: [],
  },
});

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
