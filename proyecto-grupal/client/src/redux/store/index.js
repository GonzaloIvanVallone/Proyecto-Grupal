import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import productsReducer from '../reducer/productsReducer';

const reducers = combineReducers({
	productsReducer
});

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;