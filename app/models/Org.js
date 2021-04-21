import mongoose, { Schema } from 'mongoose';
import Founder from './Founder';
import Job from './Job';

const FounderSchema = Founder.schema;
const JobSchema = Job.schema;

const OrgSchema = new Schema({
  id: {
    type: String,
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
  jobs: {
    type: [JobSchema],
    default: [],
  },
});

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
