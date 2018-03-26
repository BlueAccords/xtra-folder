// environment variables from .env file
require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const knex = require('./db/connection')
const Model = require('objection').Model;

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const app = new Koa();
const PORT = 3000;

// objection model initialization
Model.knex(knex)

// sessions
app.keys = [process.env.SESSION_SECRET_KEY];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
require('./authentication/auth');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(indexRoutes.routes());
app.use(userRoutes.routes());
app.use(authRoutes.routes());


const server = app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = server;
