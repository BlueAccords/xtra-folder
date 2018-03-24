// environment variables from .env file
require('dotenv').config();

const Koa = require('koa');
const app = new Koa();
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');

const PORT = 3000;

// routes
app.use(indexRoutes.routes());
app.use(userRoutes.routes());


const server = app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = server;
