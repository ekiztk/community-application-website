const Role = require('./../models/roleModel');
//const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
//const AppError = require('./../utils/appError');

exports.getAllRoles = factory.getAll(Role);
exports.getRole = factory.getOne(Role); //exports.getRole = factory.getOne(Role, { path: 'users' });
exports.createRole = factory.createOne(Role);
exports.updateRole = factory.updateOne(Role);
exports.deleteRole = factory.deleteOne(Role);
