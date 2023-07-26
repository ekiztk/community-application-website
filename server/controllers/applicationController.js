const catchAsync = require('../utils/catchAsync');
const Application = require('./../models/applicationModel');
const factory = require('./handlerFactory');

exports.isCollaborator = catchAsync(async (req, res, next) => {
  const query = Application.findOne({
    $and: [
      { _id: { $eq: req.params.id } },
      { collaborators: { $elemMatch: { $eq: req.user.id } } }
    ]
  });

  const doc = await query;
  if (doc) {
    res.status(200).json({
      status: 'success',
      data: {
        data: null
      }
    });
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'You are not one of the collaborators of the application.'
    });
  }
});

exports.createApplication = catchAsync(async (req, res, next) => {
  const doc = await Application.create({
    ...req.body,
    collaborators: [req.user.id]
  });
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getAllApplications = factory.getAll(Application);
exports.getApplication = factory.getOne(Application); //exports.getApplication = factory.getOne(Application, { path: 'responses' });
exports.updateApplication = factory.updateOne(Application);
exports.deleteApplication = factory.deleteOne(Application);
