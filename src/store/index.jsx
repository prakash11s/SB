import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from './reducer';

const middleware = [thunk];

const persistConfig = {
    key: 'soul',
    storage
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

let persistor = persistStore(store);
  
export {
    store,
    persistor,
};
