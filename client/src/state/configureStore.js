import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './rootReducer';

// used to initialize user session from cookie
import { loadUserSession, executeLoadUserSession } from './authentication/sagas';

// used to make redux saga calls that can return promises
import { middleware as thunkMiddleware } from 'redux-saga-thunk' 
import rootSaga from './rootSaga';

// react-router-redux middleware
import { routerMiddleware } from 'react-router-redux';
import history from './historyConfig';
const reduxRouterMiddleware = routerMiddleware(history);

// saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
      reduxRouterMiddleware
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

sagaMiddleware.run(rootSaga);

// load user session from cookie on app start
sagaMiddleware.run(executeLoadUserSession);

export default store;