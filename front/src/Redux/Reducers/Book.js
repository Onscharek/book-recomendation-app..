// Redux/Reducers/bookReducer.js
import { SET_SEARCH_QUERY, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE } from '../ActionTypes/User';

const initialState = {
    books: [],
    searchQuery: '',
    error: null,
    searchByRating: null,
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        case FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.payload,
            };
        case FETCH_BOOKS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default bookReducer;
