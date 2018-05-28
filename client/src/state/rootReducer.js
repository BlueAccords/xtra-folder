import { combineReducers } from 'redux';

import auth from './authentication';
import allFolders from './allFolders';

// allow redux to manage browser history
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  auth,
  allFolders,
  router: routerReducer
});