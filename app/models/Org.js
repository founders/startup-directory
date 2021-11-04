import mongoose, { Schema } from 'mongoose';
import Founder from './Founder';
import Job from './Job';
import { CATEGORIES, SIZES, STAGES } from '../utils/constants';

const FounderSchema = Founder.schema;
const JobSchema = Job.schema;

const OrgSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
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
  description: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    enum: CATEGORIES,
    required: true,
  },
  stage: {
    type: String,
    enum: STAGES,
    required: true,
  },
  size: {
    type: String,
    enum: SIZES,
    required: true,
  },
  founded: {
    type: Date,
    required: true,
  },
  isHiring: {
    type: Boolean,
    required: false,
    default: false,
  },
  isHidden: {
    type: Boolean,
    required: false,
    default: false,
  },
  founders: {
    type: [FounderSchema],
    default: [],
  },
  jobs: {
    type: [JobSchema],
    default: []
  },
});

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
