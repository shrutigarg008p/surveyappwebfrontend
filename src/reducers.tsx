import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import {createTransform, persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from "redux-persist/lib/storage";
import * as  _ from "lodash";
import { authReducers } from "./Components/Auth";


const blacklistTransform = createTransform((inboundState, key) => {
  if (key === 'auth') {
    return _.omit<any>(inboundState, [
      'auth.error',
    ]);
  }
  return inboundState;
});

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['events'],
  transforms: [blacklistTransform],
  version: 2,
};

const rootReducer = combineReducers({
  adminUser: authReducers,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
// eslint-disable-next-line max-len
// const composeEnhances = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhances =  compose;


const store = createStore(
    persistedReducer, composeEnhances(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export {
  store,
  persistor,
};
