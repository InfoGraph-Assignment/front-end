import axios from "axios";
// import jwt from "jsonwebtoken";

import base64 from "base-64";
import cookies from "react-cookies";
import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNOUT_REQUEST
} from "../constants/usersConstants";


const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY || "https://infographtest.herokuapp.com";

export const signUp = (user) => async (dispatch) => {

    try {
        dispatch({ type: USER_SIGNUP_REQUEST });
        const { data } = await axios.post(
            `${REACT_APP_API_KEY}/signup`,
            user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data,
        });
    }catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
}

export const signIn = (email , password) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNIN_REQUEST });
        const encodedUsernameAndPassword =
        base64.encode(`${email}:${password}`);

        const { data } = await axios.post(
            `${REACT_APP_API_KEY}/signin`, {}, 
            { headers : {"Authorization": `Basic ${encodedUsernameAndPassword}`}});

            cookies.save("token", JSON.stringify(data.token));

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data,
            loginStatus: true,
        });
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const signOut = () => (dispatch) => {
    cookies.remove("token")
    dispatch({
        type : USER_SIGNOUT_REQUEST,
        payload : {},
        loginStatus : false
    })
}


export const validateToken = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: userData,
            loginStatus: true,
        })
    } catch (error) {
        return false;
    }
}