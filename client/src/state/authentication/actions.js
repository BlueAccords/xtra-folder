import * as types from './types';

export const userRegisterRequest = function(params) {
  return {
    type: types.USER_REGISTER_REQUEST,
    payload: params,
    // meta: thunk used to allow a promise to be returned upon action call
    meta: {
      thunk: true 
    }
  }
}
export const userRegisterSuccess = function(params, meta) {
  return {
    type: types.USER_REGISTER_SUCCESS,
    payload: params,
    meta
  }
}

export const userRegisterFailure = function(error, meta) {
  return {
    type: types.USER_REGISTER_FAILURE,
    payload: error,
    error: true,
    meta
  }
}

export const userLoginRequest = function(params) {
  return {
    type: types.USER_LOGIN_REQUEST,
    payload: params,
    meta: {
      thunk: true 
    }
  }
}

export const userLoginSuccess = function(params, meta) {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload: params,
    meta
  }
}

export const userLoginFailure = function(error, meta) {
  return {
    type: types.USER_LOGIN_FAILURE,
    payload: error,
    error: true,
    meta
  }
}

export const sessionLoadSuccess = function(user) {
  return {
    type: types.SESSION_LOAD_SUCCESS,
    payload: user,
  }
}

export const sessionLoadFailure = function(error) {
  return {
    type: types.SESSION_LOAD_FAILURE,
    payload: error,
  }
}