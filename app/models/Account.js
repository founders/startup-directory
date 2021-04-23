import mongoose, { Schema } from 'mongoose';

const AccountSchema = new Schema({
  orgId: {
    type: String,
    default: undefined,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Account ||
  mongoose.model('Account', AccountSchema);
