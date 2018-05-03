import { createStore, applyMiddleware } from 'redux';
import rootReducer from './../reducers/index';

const store = createStore(
  rootReducer
  // apply middlewares here
);

export default store;