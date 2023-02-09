const mongoose = require('mongoose');
const slugify = require('slugify');

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An application must have a name'],
      unique: true,
      maxLength: [
        40,
        'An application name must have less or equal than 40 characters'
      ],
      minLength: [
        10,
        'An application name must have more or equal than 10 characters'
      ]
    },
    slug: String,
    questions: String,
    users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Virtual populate to get relevant responses
applicationSchema.virtual('responses', {
  ref: 'Response',
  foreignField: 'application',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
applicationSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
