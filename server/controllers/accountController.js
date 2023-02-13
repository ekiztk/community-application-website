const Account = require('./../models/accountModel');
//const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
//const AppError = require('./../utils/appError');

exports.getAllAccounts = factory.getAll(Account);
exports.getAccount = factory.getOne(Account);
exports.createAccount = factory.createOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
