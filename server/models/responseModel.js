const mongoose = require('mongoose');
const Application = require('./applicationModel');

const responseSchema = new mongoose.Schema(
  {
    answers: [],
    status: {
      type: String,
      required: [true, 'A response must have a status'],
      enum: {
        values: ['pending', 'rejected', 'approved'],
        message: 'Status is either: pending, rejected, approved'
      },
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: [true, 'Response must have a creation date'],
      immutable: true
    },
    application: {
      type: mongoose.Schema.ObjectId,
      ref: 'Application',
      required: [true, 'Response must belong to an application'],
      immutable: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Response must belong to a user'],
      immutable: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

responseSchema.index({ application: 1, user: 1, status: 1 }, { unique: true });

responseSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
