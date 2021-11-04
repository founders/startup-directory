import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobSkills: {
    type: [String],
    default: [],
  },
  jobLink: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Job || 
  mongoose.model('Job', JobSchema);
