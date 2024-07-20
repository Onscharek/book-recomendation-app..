// Redux userReducer

import {  CURRENT_USER,
    REG_USER,
     FAIL_USER,
      LOAD_USER, 
      LOGOUT_USER, 
      SUCC_USER,
 } from "../ActionTypes/User";


const initState = {
    user: null,
    loadUser: false,
    errors: [],
    isAuth: false,
     userId: null,
};

const userReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case LOAD_USER:
			return { ...state, loadUser: true };
		case SUCC_USER:
			localStorage.setItem("token", payload.token);
			return { ...state, loadUser: false, user: payload.user, isAuth: true };
		case REG_USER:
			localStorage.setItem("token", payload.token);
			return { ...state, loadUser: false, user: payload.user, isAuth: true };
		case CURRENT_USER:
			return { ...state, user: payload, loadUser: false, isAuth: true };
		case FAIL_USER:
			return { ...state, loadUser: false, errors: payload };
		case LOGOUT_USER:
			localStorage.removeItem("token");
			return {
				user: null,
				loadUser: false,
				errors: [],
				isAuth: false,
			};

		default:
			return state;
    }
};

export default userReducer;
                    // org