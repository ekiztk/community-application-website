const Application = require('./../models/applicationModel');
//const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
//const AppError = require('./../utils/appError');

exports.getAllApplications = factory.getAll(Application);
exports.getApplication = factory.getOne(Application); //exports.getApplication = factory.getOne(Application, { path: 'responses' });
exports.createApplication = factory.createOne(Application);
exports.updateApplication = factory.updateOne(Application);
exports.deleteApplication = factory.deleteOne(Application);
