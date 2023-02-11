const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const responseRouter = require('./routes/responseRoutes');
const accountRouter = require('./routes/accountRoutes');
const roleRouter = require('./routes/roleRoutes');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Set security HTTP headers
app.use(helmet());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      // 'duration',
      // 'ratingsQuantity',
      // 'ratingsAverage',
      // 'maxGroupSize',
      // 'difficulty',
      // 'price'
    ]
  })
);

//adds request time to request
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
