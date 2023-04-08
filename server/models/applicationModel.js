const mongoose = require('mongoose');
const slugify = require('slugify');

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An application must have a name'],
      unique: true,
      maxLength: [
        50,
        'An application name must have less or equal than 50 characters'
      ],
      minLength: [
        5,
        'An application name must have more or equal than 5 characters'
      ]
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'An application must have a description'],
      maxLength: [
        240,
        'An application description must have less or equal than 240 characters'
      ],
      minLength: [
        10,
        'An application description must have more or equal than 10 characters'
      ]
    },
    questions: {
      type: Array,
      default: []
    },
    startDate: {
      type: Date,
      validate: {
        validator: function(val) {
          return val >= Date.now();
        },
        message:
          'Start date {{VALUE}} should be greater or equal than current date'
      }
    },
    deadlineDate: {
      type: Date
      // validate: {
      //   validator: function(val) {
      //     return Date.parse(val) >= Date.parse(this.startDate);
      //   },
      //   message:
      //     'Deadline date {{VALUE}} should be greater or equal than start date'
      // }
    },
    executives: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

applicationSchema.index({ slug: 1 });

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

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
