const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    answers: String,
    status: {
      type: String,
      required: [true, 'A response must have a status'],
      enum: {
        values: ['pending', 'rejected', 'accepted'],
        message: 'Status is either: pending, rejected, accepted'
      }
    },
    application: {
      type: mongoose.Schema.ObjectId,
      ref: 'Application',
      required: [true, 'Response must belong to an application']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Response must belong to a user.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
