import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var OrgSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  founded: {
    type: Date,
    default: Date.now
  },
  Founder: {
    type: String,
    required: true
  }
});

module.exports = mongoose.models.OrgSchema || mongoose.model('organization',OrgSchema);

