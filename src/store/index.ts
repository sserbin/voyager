import {createStore, applyMiddleware} from 'redux';
import * as createLogger from 'redux-logger';

import {DEFAULT_STATE} from '../models';
import {rootReducer} from '../reducers';

const logger = createLogger();

export function configureStore(initialState = DEFAULT_STATE) {
  const store = createStore(
    rootReducer,
    {past: [], present: initialState, future: []},
    applyMiddleware(logger)
  );
  return store;
}
