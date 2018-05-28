// SELECTORS
import { createSelector } from 'reselect';


// INPUT SELECTORS
export const getCurrentPage = (state) => state.allFolders.currentPage;
export const getIsFolderCached = (state, page) => state.allFolders.pages[page] !== undefined;
const getFoldersById = (state) => state.allFolders.byId;
const getFoldersAllIds = (state) => state.allFolders.allIds;
const getFolderIdsByPage = state => {
  const page = state.allFolders.currentPage;
  const pageIds = state.allFolders.pages[page];

  // check if page ids are already cached or not
  if (pageIds === undefined) {
    return [];
  } else {
    return pageIds
  }
}

// SELECTORS
// get all folders by mapping the array of only ids to the object containing
// all folders by their key
export const getAllFolders = createSelector(
  [getFoldersById, getFoldersAllIds],
  (foldersById, foldersAllIds) => {
    return foldersAllIds.map((allIdsKey) => foldersById[allIdsKey]);
  }
)

export const getAllFoldersOfCurrentPage = createSelector(
  [getFoldersById, getFolderIdsByPage],
  (aById, aIdsByPage) => {
    return aIdsByPage.map((pageIdKey) => aById[pageIdKey]);
  }
)