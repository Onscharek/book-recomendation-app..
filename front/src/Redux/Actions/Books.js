// Redux/Actions/bookActions.js
import axios from 'axios';
import { SET_SEARCH_QUERY, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE } from '../ActionTypes/User';

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query,
});





export const fetchBooks = (query, apiKey) => async (dispatch) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
        dispatch({
            type: FETCH_BOOKS_SUCCESS,
            payload: response.data.items,
        });
    } catch (error) {
        dispatch({
            type: FETCH_BOOKS_FAILURE,
            payload: error,
        });
    }
};
