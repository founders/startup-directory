import mongoose, { Schema } from 'mongoose';

//do not delete this line or the Founder schema will not be registered properly
import Founder from './Founder';

const FounderSchema = mongoose.model('Founder').schema;

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
