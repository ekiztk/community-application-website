const Response = require('./../models/responseModel');
//const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
//const AppError = require('./../utils/appError');

exports.getAllResponses = factory.getAll(Response);
exports.getResponse = factory.getOne(Response);
exports.createResponse = factory.createOne(Response);
exports.updateResponse = factory.updateOne(Response);
exports.deleteResponse = factory.deleteOne(Response);
