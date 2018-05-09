import * as types from './types';

export default function(
  state = {
    user: null,
    error: null
  },
  action) {
  switch(action.type) {
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
    default:
      return state;
  }
}