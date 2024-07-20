// Redux Actions (Actions/product.js)

import axios from "axios";
import {
    FAIL_PRODUCT,
    GET_PRODUCT,
    LOAD_PRODUCT,
    SUCC_PRODUCT,
    DELETE_PRODUCT
} from "../ActionTypes/User";

// get all product
export const getProducts = () => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT });
    try {
        let result = await axios.get("/api/product/getall");
        dispatch({ type: SUCC_PRODUCT, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response });
    }
};

// add product
export const addProduct = (newProduct) => async (dispatch) => {
    try {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        await axios.post("/api/product/add", newProduct, config);
        dispatch(getProducts());
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response });
    }
};

// delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        await axios.delete(`/api/product/${id}`, config);
        dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (err) {
        console.error(err);
    }
};

// edit product
// edit product
export const editProduct = (id, newProduct) => async (dispatch) => {
    try {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        await axios.put(`/api/product/${id}`, newProduct, config);
        dispatch(getProducts());
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response });
    }
};

export const getProduct = (id) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT });
    try {
        let result = await axios.get(`/api/product/${id}`);
        dispatch({ type: GET_PRODUCT, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response });
    }
};