import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';

import defaultState from '../store/default-state';
import { fromJS } from 'immutable';

export function configureStore(initialState = fromJS(defaultState)) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(
      applyMiddleware(),
      autoRehydrate(),
    ),
  );

  return store;
}

const persistor = persistStore(store, {
  storage: AsyncStorage,
});

const store = configureStore();
