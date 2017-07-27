/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const createBjnStore = applyMiddleware(thunk)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createBjnStore)(reducers);
  persistStore(store, { storage: AsyncStorage }, onComplete);
  return store;
}

export default configureStore;
