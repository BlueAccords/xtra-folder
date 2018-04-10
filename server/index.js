// environment variables from .env file
require('dotenv').config();
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
const dbErrorHandler = require('./middlewares/dbErrorHandler');

const routes = require('./routes/v1');


// const indexRoutes = require('./routes/index');
// const userRoutes = require('./routes/user');
// const folderRoutes = require('./routes/folder');
// const gameRoutes = require('./routes/game');
// const authRoutes = require('./routes/auth');
// const chipRoutes = require('./routes/chip');

const app = new express();
const PORT = 3000;

// objection model initialization
Model.knex(knex)

// server logger
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  app.use(logger('dev'));
}

// sessions
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  // TODO: set this to true once https is enabled
  // cookie: { secure: true } 
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
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// v1 api routes
app.use('/api', routes);

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
      error: err,
      data: err
    });
  }
});

const server = app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = server;
