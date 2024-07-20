

import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import {thunk} from "redux-thunk";
import userReducer from "../Reducers/User";
import bookReducer from '../Reducers/Book';
import productReducer from "../Reducers/product";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  books: bookReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
              // orgg