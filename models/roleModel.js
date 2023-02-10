const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A role must have a name'],
      maxLength: [20, 'A role name must have less or equal than 20 characters']
    },
    label: {
      type: String,
      required: [true, 'A role must have a label'],
      maxLength: [40, 'A role label must have less or equal than 40 characters']
    },
    permissions: {
      type: String,
      required: [true, 'A role must have at least a permission']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Virtual populate to get relevant users
roleSchema.virtual('users', {
  ref: 'User',
  foreignField: 'role',
  localField: '_id'
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
