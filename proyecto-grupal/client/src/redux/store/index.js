import { createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import productsReducer from '..//reducer/productsReducer';
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'root',
    storage,
  }

const pReducer = persistReducer(persistConfig, productsReducer);
const middleware = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };
