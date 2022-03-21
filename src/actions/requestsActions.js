import axios from "axios";
import {
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
} from "../constants/requestsConstants";

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY || "http://localhost:5000";

export const listRequests = (id , token) => async (dispatch) => {
  console.log("id", id);
  console.log("token", token);
  try {
    dispatch({ type: REQUEST_LIST_REQUEST });
    const { data } = await axios.post(
      `${REACT_APP_API_KEY}/myRequests`,{userId : id},
      { headers: { 'Authorization': `Bearer ${token}` } }

    );

    dispatch({
      type: REQUEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRequestsDetails = (id) => async (dispatch) => {
  
  try {
    dispatch({
      type: REQUEST_DETAILS_REQUEST,
    });
    const { data } = await axios.get(
      `${REACT_APP_API_KEY}`
    );
    

    dispatch({
      type: REQUEST_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: REQUEST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};