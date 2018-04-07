// environment variables from .env file
require('dotenv').config();
// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
// const passport = require('koa-passport');
const knex = require('./db/connection')
const Model = require('objection').Model;

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const folderRoutes = require('./routes/folder');
const gameRoutes = require('./routes/game');
const authRoutes = require('./routes/auth');
const chipRoutes = require('./routes/chip');

const app = new express();
const PORT = 3000;

// objection model initialization
Model.knex(knex)

// server logger
app.use(logger('dev'));

// sessions
app.keys = [process.env.SESSION_SECRET_KEY];
app.use(session(app));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  // parse url-encoded dating using "querystring". 
  // check body parser docs for more info
  extended: false
}));

// authentication
require('./authentication/auth');
app.use(passport.initialize());
app.use(passport.session());

// cors
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// routes
app.use(indexRoutes.routes());
app.use(userRoutes.routes());
app.use(folderRoutes.routes());
app.use(gameRoutes.routes());
app.use(chipRoutes.routes());
app.use(authRoutes.routes());


const server = app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = server;
