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

exports.getAllResponses = factory.getAll(Response);
exports.getResponse = factory.getOne(Response);
exports.createResponse = factory.createOne(Response);
exports.updateResponse = factory.updateOne(Response);
exports.deleteResponse = factory.deleteOne(Response);
