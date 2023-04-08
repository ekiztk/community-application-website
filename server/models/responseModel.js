const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    answers: [],
    status: {
      type: String,
      required: [true, 'A response must have a status'],
      enum: {
        values: ['pending', 'rejected', 'accepted'],
        message: 'Status is either: pending, rejected, accepted'
      },
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: [true, 'Response must have a creation date']
    },
    application: {
      type: mongoose.Schema.ObjectId,
      ref: 'Application',
      required: [true, 'Response must belong to an application']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Response must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

responseSchema.index({ application: 1, user: 1, status: 1 }, { unique: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
