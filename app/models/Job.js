import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
