import { sagas as authenticationSagas } from './authentication';
import { sagas as allFoldersSagas } from './allFolders';
import { takeEvery, takeLatest, fork, all } from 'redux-saga/effects';


const allSagas = [
  ...authenticationSagas,
  ...allFoldersSagas
]


// start all sagas in parallel
export default function* rootSaga() {
  yield all(allSagas.map((saga) => fork(saga)));
}