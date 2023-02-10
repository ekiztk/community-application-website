const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const responseRouter = require('./routes/responseRoutes');
const accountRouter = require('./routes/accountRoutes');
const roleRouter = require('./routes/roleRoutes');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(cookieParser());

//add request time to request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/applications', applicationRouter);
app.use('/api/v1/responses', responseRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/roles', roleRouter);

//Global error handler route
app.use(globalErrorHandler);

module.exports = app;
