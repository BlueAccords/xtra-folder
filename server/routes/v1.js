const express = require('express');
const router  = express.Router();

// controllers
const userController = require('./../controllers/user');
const folderController = require('./../controllers/folder');
const gameController = require('./../controllers/game');
const authController = require('./../controllers/auth');
const chipController = require('./../controllers/chip');

const path = require('path');
const passport = require('./../authentication/local-strategy');

// user role based permission
const rbac = require('./../middlewares/userRoleHandler').checkPermissions;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

// auth
const authBaseUrl = '/auth';
router.post(`${authBaseUrl}/register`, authController.register);
router.post(`${authBaseUrl}/login`, authController.login);
router.get(`${authBaseUrl}/logout`, authController.logout);

// game
const gameBaseUrl = '/game';
const gameResource = 'game'

router.get(gameBaseUrl, 
  rbac(gameResource, 'read', false),
  gameController.getAll);
router.get(`${gameBaseUrl}/subgames`, 
  rbac(gameResource, 'read', false),
  gameController.get);
router.get(`${gameBaseUrl}/:id`, 
  rbac(gameResource, 'read', false),
  gameController.get);

// folders
const folderBaseUrl = '/folder';
const folderResource = 'folder';

router.get(folderBaseUrl, 
  rbac(folderResource, 'read', false),
  folderController.getAll);
router.post(`${folderBaseUrl}`, 
  rbac(folderResource, 'create', false),
  folderController.create);
router.get(`${folderBaseUrl}/:id`, 
  rbac(folderResource, 'read', false),
  folderController.get);
router.put(`${folderBaseUrl}/:id`, 
  rbac(folderResource, 'update', true),
  folderController.update);

// chips
const chipBaseUrl = '/chip';
const chipResource = 'chip';
router.get(chipBaseUrl, 
  rbac(chipResource, 'read', false),
  chipController.getAll);
router.get(`${chipBaseUrl}/primary/:id`, 
  rbac(chipResource, 'read', false),
chipController.getByPrimaryGame);
router.post(`${chipBaseUrl}`, 
  rbac(chipResource, 'create', false),
  chipController.create);
router.get(`${chipBaseUrl}/:id`, 
  rbac(chipResource, 'get', false),
  chipController.get);
router.put(`${chipBaseUrl}/:id`, 
  rbac(chipResource, 'update', true),
  chipController.update);

// users
const userBaseUrl = '/user';
const userResource = 'user';
router.get(userBaseUrl, 
  rbac(userResource, 'read', false),
  userController.getAll);
router.get(`${userBaseUrl}/:id`, 
  rbac(userResource, 'read', false),
  userController.get);

async function authenticate(req, res, next) {
  next();
}



// router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


// //********* API DOCUMENTATION **********
// router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
// router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;