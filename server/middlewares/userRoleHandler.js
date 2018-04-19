/**
 * This middleware includes the definitions for the user roles
 * AND includes a helper function in the form of a middleware function that checks
 * whether or not the current user is allowed to do a specific action
 */

const Boom = require('boom');
const AccessControl = require('accesscontrol');
const authHelper = require('./../middlewares/authHelper');

grantsObject = {
  admin: {
    user: {
        'create:any': ['*'],
        'read:any': ['*', '!password_digest'],
        'update:any': ['*', '!password_digest'],
        'delete:any': ['*']
    },
    folder: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*']
    },
    game: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*', '!id'],
        'delete:any': ['*']
    },
    chip: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*']
    },
    chip_copy: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*']
    },
    chip_code: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*']
    }
  },
  standard: {
    user: {
        'create:any': ['*'],
        'read:any': ['*', '!password_digest', '!email'],
        'update:own': ['*', '!password_digest'],
        'delete:own': ['*']
    },
    folder: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:own': ['*', '!id'],
        'delete:own': ['*']
    },
    game: {
        'read:any': ['*'],
    },
    chip: {
        'read:any': ['*'],
    },
    chip_copy: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:own': ['*'],
        'delete:own': ['*']
    },
    chip_code: {
        'read:any': ['*'],
    }
  },
  moderator: {
    user: {
        'create:any': ['*'],
        'read:any': ['*', '!password_digest'],
    },
    folder: {
        'create:any': ['*'],
        'read:any': ['*'],
    },
    game: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*', '!id'],
    },
    chip: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*', '!id'],
    },
    chip_copy: {
        'create:any': ['*'],
        'read:any': ['*'],
    },
    chip_code: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
    },
  }
}

const ac = new AccessControl(grantsObject);

/**
 * 
 * @param {string} role 
 *  the user role, should be obtained from deserialization of user session object
 * @param {string} resource 
 *  controller resource, should be the same for any set of resources
 * @param {string} action 
 *  http action: create, read, update, or delete, may also include 'own'
 * @param {boolean} isOwner
 *  boolean indicating if user must also be the owner or not.
 */
function checkPermissions(resource, action, isOwner) {
  return function testing(req, res, next) {

    const user = req.user;
    let isAllowed = { granted: false };
    let role = '';
    if(authHelper.isAuthenticated(req)) {
      role = user.role;
      switch (action) {
        case 'create':
          if(isOwner) {
            isAllowed = ac.can().role(role).resource(resource).createOwn();
          }  else {
            isAllowed = ac.can().role(role).resource(resource).createAny();
          }     
          break;
        case 'read':
          if(isOwner) {
            isAllowed = ac.can().role(role).resource(resource).readOwn();
          }  else {
            isAllowed = ac.can().role(role).resource(resource).readAny();
          }
          break;
        case 'update':
          if(isOwner) {
            isAllowed = ac.can().role(role).resource(resource).updateOwn();
          }  else {
            isAllowed = ac.can().role(role).resource(resource).updateAny();
          }     
          break; 
        case 'delete':
          if(isOwner) {
            isAllowed = ac.can().role(role).resource(resource).deleteOwn();
          }  else {
            isAllowed = ac.can().role(role).resource(resource).deleteAny();
          }     
          break;
        default:
          break;
      }
    }

    console.log(`user role: ${role} on resource: ${resource} for action: ${action} is ${isAllowed.granted}`);
    if(isAllowed.granted) {
      next();
    } else {
      next(Boom.forbidden());
    }
  }
}


module.exports = {
  checkPermissions
}