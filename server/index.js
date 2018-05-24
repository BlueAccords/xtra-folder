// environment variables from .env file
// require('dotenv').config();
require('dotenv').config({path: './../.env'});
require('express-async-errors'); // middleware used to support async/await error propogation in routes

const knex = require('./db/connection')
const Model = require('objection').Model;
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const Boom = require('boom');

const requestErrorHandler = require('./middlewares/requestValidationErrorHandler');
const dbErrorHandler = require('./middlewares/dbErrorHandler');
const routes = require('./routes/v1');
const redisStore = require('./db/redisStore');

const app = new express();
const PORT = 3000;

// objection model initialization
Model.knex(knex)

// server logger
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'production') {
  app.use(logger('dev'));
}

// sessions
app.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  // TODO: set this to true once https is enabled
  // cookie: { secure: true } 
  cookie: {
    httpOnly: false,
    secure: false
  }
}))

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  // parse url-encoded dating using "querystring". 
  // check body parser docs for more info
  extended: false
}));

// authentication
// require('./authentication/auth');
app.use(passport.initialize());
app.use(passport.session());

// cors
// IDEA: re examine what options are needed in production
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-PINGOTHER', 'X-Requested-With', 
    'Accept', 'Origin', 'X-HTTP-Method-Override', 'Authorization', 'Cookie'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Cookie'],
  credentials: true
}
app.use(cors(corsOptions));

// v1 api routes
app.use('/api', routes);

// request object validation error handler
app.use(requestErrorHandler.errorHandler);

// db error handler
app.use(dbErrorHandler.errorHandler);

// catch all error handler
app.use(function (err, req, res, next) {
  if(process.env.NODE_ENV == 'development') {
    console.error(err.stack)
  }

  if(Boom.isBoom(err)) {
    res.status(err.output.statusCode)
      .json(err.output.payload);
  } else {
    res.status(500).json({
      success: false,
      error: err.message || err,
      data: err,
    });
  }
});

const server = app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = server;
