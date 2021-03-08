import mongoose, { Schema } from 'mongoose';

const FounderSchema = require('mongoose').model('founder').schema;

const PositionSchema = require('mongoose').model('position').schema;

const OrgSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    required: false
  },
  facebook: {
    type: String,
    required: false
  },
  twitter: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  founded: {
    type: Date,
    required: true
  },
  logoURL: {
    type: String,
    required: false
  },
  hiring: {
    type: Boolean,
    required: true
  },
  stage: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  founders: [FounderSchema],
  tags: [String],
  positions: [PositionSchema]
});

module.exports = mongoose.models.OrgSchema || mongoose.model('organization', OrgSchema);

