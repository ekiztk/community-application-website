const Application = require('../models/applicationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Response = require('./../models/responseModel');
const factory = require('./handlerFactory');

exports.canApply = catchAsync(async (req, res, next) => {
  const { application, user } = req.body;
  const query = Response.exists({
    application: application,
    user: user,
    status: { $eq: 'pending' }
  });

  const doc = await query;

  if (doc) {
    res.status(400).json({
      status: 'fail',
      message:
        'You have already a pending response. Please wait for the result to apply again.'
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        data: null
      }
    });
  }
});

exports.updateResponse = catchAsync(async (req, res, next) => {
  const isCollaborator = await Application.findOne({
    $and: [
      { _id: { $eq: req.body.application } },
      { collaborators: { $elemMatch: { $eq: req.user.id } } }
    ]
  });

  if (!isCollaborator) {
    return next(
      new AppError(
        'You are not one of the collaborators of the application.',
        400
      )
    );
  }

  const doc = await Response.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.deleteResponse = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!'
  });
};

exports.getResponse = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!'
  });
};

exports.getAllResponses = factory.getAll(Response);
exports.createResponse = factory.createOne(Response);
