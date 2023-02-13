//function to catch errors happens in try-catch blocks
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err)); //send the error to the global error handler middleware
  };
};
