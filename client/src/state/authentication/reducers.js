import * as types from './types';

export default function(
  state = {
    user: null,
    error: null,
    isInitialSessionLoaded: false
  },
  action) {
  switch(action.type) {
    // user register
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.data
      }
    case types.USER_REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }
    // user login
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data
      }
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }
    // loading user data from cookie session
    case types.SESSION_LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        isInitialSessionLoaded: true
      }
    case types.SESSION_LOAD_FAILURE:
      return {
        ...state,
        user: null,
        isInitialSessionLoaded: true
      }   
    default:
      return state;
  }
}