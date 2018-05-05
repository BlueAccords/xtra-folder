import * as types from './types';

export default function(
  state = {
    user: {},
    error: {}
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
    default:
      return state;
  }
}