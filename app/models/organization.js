import mongoose, { Schema } from 'mongoose';

const FounderSchema = require('mongoose').model('founder').schema;

const OrgSchema = new Schema({
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
    required: true
  },
  founders: [FounderSchema]
});

module.exports = mongoose.models.OrgSchema || mongoose.model('organization', OrgSchema);

