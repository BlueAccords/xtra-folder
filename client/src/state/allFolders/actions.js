import * as types from './types';

export const foldersFetchRequest = function(payload) {
  return {
    type: types.FOLDERS_FETCH_REQUEST,
    payload
  }
}

export const foldersFetchSuccess = function(payload) {
  return {
    type: types.FOLDERS_FETCH_SUCCESS,
    payload: payload
  }
}

export const foldersFetchFailure = function(error) {
  return {
    type: types.FOLDERS_FETCH_FAILURE,
    payload: error
  }
}

export const foldersFetchExit = function() {
  return {
    type: types.FOLDERS_FETCH_EXIT,
  }
}

export const foldersSetCurrentPage = function(page) {
  return {
    type: types.FOLDERS_SET_CURRENT_PAGE,
    payload: page
  }
}

export const foldersClearPageCache = function() {
    return {
      type: types.FOLDERS_CLEAR_PAGE_CACHE
    }
}

// this action does the same thing as fetchRequest, but adds a debounce of 2 seconds
// to account for the user typing
export const foldersFilterRequest = function(payload) {
  return {
    type: types.FOLDERS_FILTER_REQUEST,
    payload
  }
}