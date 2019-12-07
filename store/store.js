import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import rootReducer from './index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(
    // createLogger(),
  ),
);

export let persistor = persistStore(store);
