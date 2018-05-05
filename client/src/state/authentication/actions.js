import * as types from './types';

export const userRegisterRequest = function(params) {
  return {
    type: types.USER_REGISTER_REQUEST,
    payload: params
  }
}

export const userRegisterSuccess = function(params) {
  return {
    type: types.USER_REGISTER_SUCCESS,
    payload: params
  }
}

export const userRegisterFailure = function(params) {
  return {
    type: types.USER_REGISTER_FAILURE,
    payload: params
  }
}