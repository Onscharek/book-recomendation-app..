import { combineReducers } from "redux";
import userReduser from "./User";
import bookReducer from './Book';

const rootReducer =combineReducers({
    user:userReduser,
    books: bookReducer,
    
})
export default rootReducer;