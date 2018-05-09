import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'
import * as actions from './actions';
import * as types from './types';
import api from './api';

export function* userRegister(action) {
  const { payload, meta } = action;
  try {
    const data = yield call(api.registerUser, action.payload);
    yield put(actions.userRegisterSuccess(data, meta));
  } catch(err) {
    console.log(err);
    yield put(actions.userRegisterFailure(err, meta));
  }
}

// Watches for specific action, and then executes the related saga
export function* watchUserRegisterRequest() {
  yield takeEvery(types.USER_REGISTER_REQUEST, userRegister);
}

// export only watcher sagas in one variable
export const sagas = [
  watchUserRegisterRequest
];


