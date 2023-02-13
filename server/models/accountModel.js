const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An account must have a name'],
      enum: {
        values: ['steam', 'discord'],
        message: 'Name is either: steam, discord'
      }
    },
    label: {
      type: String,
      required: [true, 'An account must have a label'],
      maxLength: [
        40,
        'An account label must have less or equal than 40 characters'
      ]
    },
    accountId: String,
    isVerified: Boolean,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An account must belong to a user.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
