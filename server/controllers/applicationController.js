const Application = require('./../models/applicationModel');
const factory = require('./handlerFactory');

exports.getAllApplications = factory.getAll(Application);
exports.getApplication = factory.getOne(Application); //exports.getApplication = factory.getOne(Application, { path: 'responses' });
exports.createApplication = factory.createOne(Application);
exports.updateApplication = factory.updateOne(Application);
exports.deleteApplication = factory.deleteOne(Application);
