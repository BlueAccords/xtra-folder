const Folder = require('../models/folder');
const ChipCopy = require('../models/chip_copy');
const Chip = require('../models/chip');
const ctrlHelpers = require('./_helpers');
const Boom = require('boom');

module.exports = {
  getAll: async function(req, res) {
    const { q, sortKey='id', sortDirection='ASC', page=1, limit=25 } = req.query;

    try {
      // const folders = await Folder.query();
      const folders = await Folder.query()
        .modify((builder) => {
          if(q) {
            builder.where('title', 'like', `%${q}%`);
            builder.orWhere('description', 'like', `%${q}%`);
          }

          return builder;
        })
        .joinEager('author')
        .orderBy(sortKey, sortDirection)
        .page(page - 1, limit);
      
      // set last page property
      folders.lastPage = Math.ceil(folders.total / limit);
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
    let chipCopyParams = req.body;
    // IDEA: add better schema validation for updating values
    chipCopyParams.folder_id = id; // override passed in folder id as needed
    const newChipCopy = await ChipCopy.query().insert(chipCopyParams);

    ctrlHelpers.handleResponse(true, res, 200, 'success', newChipCopy);
  },
  updateChipCopy: async function(req, res) {
    const folderId = req.params.id;
    const copyId = req.params.copyId;
    let chipCopyParams = req.body;
    chipCopyParams.folder_id = folderId; // override folderid so users can't update chip copies of other folders
    const folder = await Folder.query().findById(folderId)
      .throwIfNotFound(); // throws error if not found and passes to error handler

    // IDEA: only updates to a chip copy should be either the code, and folder index
    const updatedChipCopy = await ChipCopy.query()
      .patch({code: chipCopyParams.code})
      .where('id', copyId)
      .andWhere('folder_id', folder.id);

    if(updatedChipCopy > 0) {
      const fetchedUpdatedChipCopy = await ChipCopy.query()
        .where('id', copyId)
        .andWhere('folder_id', folder.id)
        .first();
      ctrlHelpers.handleResponse(true, res, 200, 'success', fetchedUpdatedChipCopy);
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