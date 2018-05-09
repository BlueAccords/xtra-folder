import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

// used to make redux saga calls that can return promises
import { middleware as thunkMiddleware } from 'redux-saga-thunk' 

import rootSaga from './rootSaga';
import reducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware
    )
  )
);

/**
  without dev tools

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    sagaMiddleware
  )
)
 */

sagaMiddleware.run(rootSaga)

export default store;