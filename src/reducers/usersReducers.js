import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
} from "../constants/usersConstants";

export const usersSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

    export const usersSigninReducer = (state = {}, action) => {
        switch (action.type) {
            case USER_SIGNIN_REQUEST:
                return { loading: true };
            case USER_SIGNIN_SUCCESS:
                return { loading: false, user: action.payload ,loginStatus: action.loginStatus};
            case USER_SIGNIN_FAIL:
                return { loading: false, error: action.payload };
            default:
                return state;
        }
    }