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

const AccessControlMiddleware = require('accesscontrol-middleware');
const AccessControl = require('accesscontrol');
const knexConnection = require('./../db/connection') // used to make db calls to check for ownership
const acConfig = require('./../config/accessControlConfig');
const ac = new AccessControl(acConfig);
const isAllowed = new AccessControlMiddleware(ac, knexConnection);

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
  isAllowed.check({
    resource : gameResource,
    action: 'read',
   }),  
  gameController.getAll);
router.get(`${gameBaseUrl}/subgames`, 
  isAllowed.check({
    resource : gameResource,
    action: 'read',
   }),  
  gameController.get);
router.get(`${gameBaseUrl}/:id`, 
  isAllowed.check({
    resource : gameResource,
    action: 'read',
   }),  
  gameController.get);

// folders
const folderBaseUrl = '/folder';
const folderResource = 'folder';

// GET#All folders
router.get(folderBaseUrl, 
  isAllowed.check({
    resource : folderResource,
    action: 'read',
   }),  
  folderController.getAll);

// POST#Create a new folder
router.post(`${folderBaseUrl}`, 
  isAllowed.check({
    resource : folderResource,
    action: 'create',
   }),  
  folderController.create);

// GET#get single folder by id
router.get(`${folderBaseUrl}/:id`, 
  isAllowed.check({
    resource : folderResource,
    action: 'read',
   }),  
  folderController.get);

// PUT#update single folder by id
router.put(`${folderBaseUrl}/:id`, 
  isAllowed.check({
    resource : folderResource,
    action: 'update',
    checkOwnerShip : true,
    useModel: true,
    operands : [
      { source : 'user', key : 'id' },
      { source : 'params', key : 'id', modelName: folderResource, modelKey: 'id', opKey: 'author_id' }
      ]
   }),  
  folderController.update);

// folder chip copies
const chipCopyUrl = 'chips'
// GET#get all chip copies of a folder by id
router.get(`${folderBaseUrl}/:id/${chipCopyUrl}`, 
  isAllowed.check({
    resource : folderResource,
    action: 'read',
   }),  
  folderController.getChipCopiesOfFolder);
// POST#Create a new chip copy
router.post(`${folderBaseUrl}/:id/${chipCopyUrl}`, 
  isAllowed.check({
    resource : folderResource,
    action: 'create',
   }),  
  folderController.createChipCopy);

// PUT#update a chip copy
router.put(`${folderBaseUrl}/:id/${chipCopyUrl}/:copyId`, 
  isAllowed.check({
    resource : folderResource,
    action: 'update',
    checkOwnerShip : true,
    useModel: true,
    operands : [
      { source : 'user', key : 'id' },
      { source : 'params', key : 'id', modelName: folderResource, modelKey: 'id', opKey: 'author_id' }
      ]
   }),  
  folderController.updateChipCopy);

// DELETE#Delete a chip copy
router.delete(`${folderBaseUrl}/:id/${chipCopyUrl}/:copyId`, 
  isAllowed.check({
    resource : folderResource,
    action: 'delete',
    checkOwnerShip : true,
    useModel: true,
    operands : [
      { source : 'user', key : 'id' },
      { source : 'params', key : 'id', modelName: folderResource, modelKey: 'id', opKey: 'author_id' }
      ]
   }),  
  folderController.deleteChipCopy);


// chips
const chipBaseUrl = '/chip';
const chipResource = 'chip';
router.get(chipBaseUrl, 
  isAllowed.check({
    resource : chipResource,
    action: 'read',
   }),  
  chipController.getAll);
router.get(`${chipBaseUrl}/primary/:id`, 
  isAllowed.check({
    resource : chipResource,
    action: 'read',
   }),  
  chipController.getByPrimaryGame);
router.post(`${chipBaseUrl}`, 
  isAllowed.check({
    resource : chipResource,
    action: 'create',
   }),  
  chipController.create);
router.get(`${chipBaseUrl}/:id`, 
  isAllowed.check({
    resource : chipResource,
    action: 'read',
   }),  
  chipController.get);
router.put(`${chipBaseUrl}/:id`, 
  isAllowed.check({
    resource : chipResource,
    action: 'update',
   }),
  chipController.update);

// users
const userBaseUrl = '/user';
const userResource = 'user';
router.get(userBaseUrl, 
  isAllowed.check({
    resource : userResource,
    action: 'read',
   }),
  userController.getAll);
router.get(`${userBaseUrl}/:id`, 
  isAllowed.check({
    resource : userResource,
    action: 'read',
   }),
  userController.get);



// router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)
module.exports = router;