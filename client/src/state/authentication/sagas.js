import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions';
import * as types from './types';
import api from './api';

export function* userRegister(action) {
  const { payload, meta } = action;
  try {
    const data = yield call(api.registerUser, action.payload);
    yield put(actions.userRegisterSuccess(data, meta));
    yield put(push('/dashboard'));
  } catch(err) {
    console.log(err);
    yield put(actions.userRegisterFailure(err, meta));
  }
}

// Watches for specific action, and then executes the related saga
export function* watchUserRegisterRequest() {
  // NOTE: this action also returns a promise on success/failure
  yield takeEvery(types.USER_REGISTER_REQUEST, userRegister);
}

export function* userLogin(action) {
  const { payload, meta } = action;
  try {
    const data = yield call(api.loginUser, action.payload);
    yield put(actions.userLoginSuccess(data, meta));
    yield put(push('/dashboard')); // redirect back to dashboard
  } catch(err) {
    console.log(err);
    yield put(actions.userLoginFailure(err, meta));
  }
}

export function* watchUserLoginRequest() {
  yield takeEvery(types.USER_LOGIN_REQUEST, userLogin);
}

// export only watcher sagas in one variable
export const sagas = [
  watchUserRegisterRequest,
  watchUserLoginRequest
];



