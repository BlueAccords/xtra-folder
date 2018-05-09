import { combineReducers } from 'redux';

import auth from './authentication';

// allow redux to manage browser history
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  auth,
  router: routerReducer
});