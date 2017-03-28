import {applyMiddleware, createStore, Store} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {StateWithHistory} from 'redux-undo';

import {DEFAULT_STATE, StateBase} from '../models';
import {rootReducer} from '../reducers';

export function configureStore(initialState = DEFAULT_STATE) {
  const store = createStore(
    rootReducer,
    {past: [], present: initialState, future: []},
    applyMiddleware(thunkMiddleware)
  );
  return store;
}
