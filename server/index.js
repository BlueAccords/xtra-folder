// environment variables from .env file
require('dotenv').config();

const Koa = require('koa');
const app = new Koa();
const indexRoutes = require.main.require('server/routes/index');

const PORT = 3000;

// routes
app.use(indexRoutes.routes());


const server = app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

module.exports = server;
