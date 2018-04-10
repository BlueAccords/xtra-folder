const express = require('express');
const router  = express.Router();

// controllers
// const indexController = require('./../controllers/index');
// const userController = require('./../controllers/user');
const folderController = require('./../controllers/folder');
const gameController = require('./../controllers/game');
const authController = require('./../controllers/auth');
const chipController = require('./../controllers/chip');

// const custom 	        = require('./../middleware/custom');
// const passport = require('passport');

const path = require('path');
const passport = require('./../authentication/local-strategy');

// require('./../middleware/passport')(passport)

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
router.get(gameBaseUrl, gameController.getAll);
router.get(`${gameBaseUrl}/subgames`, gameController.get);
router.get(`${gameBaseUrl}/:id`, gameController.get);

// folders
const folderBaseUrl = '/folder';
router.get(folderBaseUrl, folderController.getAll);
router.post(`${folderBaseUrl}`, folderController.create);
router.get(`${folderBaseUrl}/:id`, folderController.get);
router.put(`${folderBaseUrl}/:id`, folderController.update);

// chips
const chipBaseUrl = '/chip';
router.get(chipBaseUrl, chipController.getAll);
router.get(`${chipBaseUrl}/primary/:id`, chipController.getByPrimaryGame);
router.post(`${chipBaseUrl}`, chipController.create);
router.get(`${chipBaseUrl}/:id`, chipController.get);
router.put(`${chipBaseUrl}/:id`, chipController.update);


// router.post(    '/users',           UserController.create);                                                    // C
// router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
// router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
// router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
// router.post(    '/users/login',     UserController.login);

// router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
// router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

// router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
// router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
// router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

// router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


// //********* API DOCUMENTATION **********
// router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
// router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;