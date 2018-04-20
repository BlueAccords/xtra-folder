const Folder = require('../models/folder');
const ChipCopy = require('../models/chip_copy');
const Chip = require('../models/chip');
const ctrlHelpers = require('./_helpers');
const Boom = require('boom');

module.exports = {
  getAll: async function(req, res) {
    try {
      const folders = await Folder.query();
      ctrlHelpers.handleResponse(true, res, 200, 'success', folders);
    } catch (err) {
      throw Boom.badRequest(err);
    }
  },
  get: async function(req, res) {
    const id = req.params.id;
    const folder = await Folder.query().findById(id);
    if(folder) {
      ctrlHelpers.handleResponse(true, res, 200, 'success', folder);
    } else {
      throw Boom.notFound('No folder with that id was found');
    }
  },
  create: async function(req, res) {
    let folderParams = req.body;

    // set folder user, author id if logged in
    if(req.isAuthenticated()) {
      folderParams.author_id = req.user.id;
    }
    const folder = await Folder.query()
      .insert(folderParams);
    
    // success route
    ctrlHelpers.handleResponse(true, res, 201, 'success', folder)
  },
  update: async function(req, res) {
    const id = req.params.id;
    const folderParams = req.body;
    const folder = await Folder.query().findById(id)
      .throwIfNotFound(); // throws error if not found and passes to error handler


    // TODO: add authorization by author id, or moderator/admin role
    const updatedFolder = await Folder.query()
      .patchAndFetchById(folder.id, folderParams);
    
    ctrlHelpers.handleResponse(true, res, 200, 'success', updatedFolder);
  },
  getChipCopiesOfFolder: async function(req, res) {
    const id = req.params.id;
    const chipCopies = await ChipCopy.query()
      .where('folder_id', id);
    
    if(chipCopies.length > 0) {
      ctrlHelpers.handleResponse(true, res, 200, 'success', chipCopies);
    } else {
      throw Boom.notFound('No chip copies found with that folder id');
    }
  },
  createChipCopy: async function(req, res) {
    const id = req.params.id;
    const chipCopyParams = req.body;
    const newChipCopy = await ChipCopy.query().insert(chipCopyParams);

    ctrlHelpers.handleResponse(true, res, 200, 'success', newChipCopy);
  },
  updateChipCopy: async function(req, res) {
    const folderId = req.params.id;
    const copyId = req.params.copyId;
    const chipCopyParams = req.body;
    const folder = await Folder.query().findById(folderId)
      .throwIfNotFound(); // throws error if not found and passes to error handler

    // IDEA: only updates to a chip copy should be either the code, and folder index
    const updatedChipCopy = await ChipCopy.query()
      .patch({code: chipCopyParams.code})
      .where('id', copyId)
      .andWhere('folder_id', folder.id);

    if(updatedChipCopy > 0) {
      ctrlHelpers.handleResponse(true, res, 200, 'success');
    } else {
      throw Boom.notFound(`Chip copy with id of ${copyId} not found.`);
    }
    
  },
  deleteChipCopy: async function(req, res) {
    const folderId = req.params.id;
    const folder = await Folder.query().findById(folderId)
      .throwIfNotFound(); // throws error if not found and passes to error handler
    const copyId = req.params.copyId;
    const deletedChipCopy = await ChipCopy.query()
      .delete()
      .where('id', copyId)
      .andWhere('folder_id', folder.id);

    // check if row was deleted
    if(deletedChipCopy > 0) {
      ctrlHelpers.handleResponse(true, res, 200, 'success');
    } else {
      throw Boom.notFound(`Chip copy with id of ${copyId} not found.`);
    }
  }
}

// router.get(BASE_URL, async (ctx) => {
// });

// // create a new chip copy for a folder
// router.post(`${BASE_URL}/:id/chips`, async(ctx) => {
//     const id = ctx.params.id;
//     const chipCopyParams = ctx.request.body;
//     const newChipCopy = await ChipCopy.query().insert(chipCopyParams);

//     ctx.body = {
//       status: 'success',
//       data: newChipCopy
//     };
// });

// // create a new chip copy for a folder
// router.put(`${BASE_URL}/:folderId/chips/:chipCopyId`, async(ctx) => {
//   const folderId = ctx.params.folderId;
//   const chipCopyId = ctx.params.chipCopyId

//   const chipCopyParams = ctx.request.body;
//   const updatedChipCopy = await ChipCopy.query()
//     .patchAndFetchById(chipCopyId, chipCopyParams);


//   ctx.body = {
//     status: 'success',
//     data: updatedChipCopy
//   };
// });

// router.del(`${BASE_URL}/:folderId/chips/:chipCopyId`, async(ctx) => {
//   const chipCopyId = ctx.params.chipCopyId;
//   const result = await ChipCopy.query()
//     .delete()
//     .where('id', chipCopyId);

//   ctx.body = {
//     status: 'success',
//     data: result
//   }; 
// });
