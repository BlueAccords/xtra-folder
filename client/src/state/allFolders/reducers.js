import * as types from './types';
import { combineReducers } from 'redux';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.FOLDERS_FETCH_REQUEST:
      return true;
    case types.FOLDERS_FETCH_SUCCESS:
      return false;
    case types.FOLDERS_FETCH_FAILURE:
      return false;
    case types.FOLDERS_FETCH_EXIT: // used to prematurely exit fetch if folders are already cached
      return false;
    default:
      return state;
  }
}

const error = (state = null, action) => {
  switch(action.type) {
    case types.FOLDERS_FETCH_REQUEST:
      return null;
    case types.FOLDERS_FETCH_FAILURE:
      return action.payload 
    default:
      return state;
  }
}

// object containing all the items, with folder keys as the object properties
const byId  = (state = {}, action) => {
  console.log(action.payload);
  const foldersList = {};
  switch(action.type) {
    case types.FOLDERS_FETCH_SUCCESS:
      for(let i = 0; i < action.payload.data.length; i++) {
        const folderItem = action.payload.data[i];
        foldersList[folderItem.id] = folderItem;
      }
      return {
        ...state,
        ...foldersList
      }
    default:
      return state;
  }
}

// array of only the item ids
const allIds = (state = [], action) => {
  switch(action.type) {
    case types.FOLDERS_FETCH_SUCCESS:
      return [
        ...state,
        ...action.payload.data.map((item) => {
          return item.id;
        })
      ]
    default:
      return state;
  }
}

const currentPage = (state = 1, action) => {
  switch(action.type) {
    case types.FOLDERS_SET_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
}

const lastPage = (state = 0, action) => {
  switch(action.type) {
    case types.FOLDERS_FETCH_SUCCESS:
      return action.payload.lastPage
    default:
      return state;
  }
}

const pages = (state = {}, action) => {
  switch(action.type) {
    case types.FOLDERS_FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.currentPage]: action.payload.data.map((item) => item.id)
      }
    case types.FOLDERS_CLEAR_PAGE_CACHE:
      return {}
    default:
      return state;
  }
}

export default combineReducers({
  error,
  isLoading,
  byId,
  allIds,
  currentPage,
  lastPage,
  pages
});