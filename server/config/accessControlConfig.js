// user permissions for each role

module.exports = {
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
        'update:own': ['*'],
        'delete:own': ['*']
    },
    game: {
        'read:any': ['*'],
    },
    chip: {
        'read:any': ['*'],
    },
    chip_copy: {
        'create:own': ['*'],
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