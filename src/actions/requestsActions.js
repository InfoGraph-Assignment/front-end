import axios from "axios";
import {
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
  NEW_REQUEST_REQUEST,
  NEW_REQUEST_SUCCESS,
  NEW_REQUEST_FAIL,
  UPDATE_REQUEST_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  ALL_REQUESTS_REQUEST,
  ALL_REQUESTS_SUCCESS,
  ALL_REQUESTS_FAIL,
  REQUEST_ByStatus_REQUEST,
  REQUEST_ByStatus_SUCCESS,
  REQUEST_ByStatus_FAIL,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL


} from "../constants/requestsConstants";

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY || "https://infographtest.herokuapp.com";

export const listRequests = (id , token) => async (dispatch) => {
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

export const listRequestsDetails = (userId , token , id) => async (dispatch) => {
  try {
    dispatch({
      type: REQUEST_DETAILS_REQUEST,
    });
    const { data } = await axios.get(
      `${REACT_APP_API_KEY}/getRequsetById/${userId}/${id}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
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

export const newRequest = ( token , requestData) => async (dispatch) => {

  try {
    dispatch({  type: NEW_REQUEST_REQUEST });
    const { data } = await axios.post(
      `${REACT_APP_API_KEY}/newRequest`,
      requestData,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    dispatch({
      type: NEW_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,  
    });
  }
}


export const updateRequest = ( token ,requestId, requestData) => async (dispatch) => {
  try{
    dispatch({ type: UPDATE_REQUEST_REQUEST });
    const { data } = await axios.put(
      `${REACT_APP_API_KEY}/updateRequsest/${requestId}`,
      requestData,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    console.log("from action = > " , data)
    dispatch({
      type: UPDATE_REQUEST_SUCCESS,
      payload: data,
    });
  }catch(error){
    dispatch({
      type: UPDATE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,  
    });
  }
}

export const allRequests = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REQUESTS_REQUEST });
    const { data } = await axios.get(
      `${REACT_APP_API_KEY}/allRequests`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    dispatch({
      type: ALL_REQUESTS_SUCCESS,
      payload: data,
    });
  }catch(e){
    dispatch({
      type: ALL_REQUESTS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
}

export const requestByStatus = (token , status) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ByStatus_REQUEST });

    const { data } = await axios.get(
      `${REACT_APP_API_KEY}/requestByStatus/${status}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    dispatch({
      type: REQUEST_ByStatus_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ByStatus_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateStatus = (token , id , status)=> async(dispatch)=>{
  try{
    dispatch({ type: UPDATE_STATUS_REQUEST });

    const { data } = await axios.put(
      `${REACT_APP_API_KEY}/updateStatus/${status}/${id}`,{},
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    dispatch({
      type: UPDATE_STATUS_SUCCESS,
      payload: data,
    });
  } catch(error){
    dispatch({
      type: UPDATE_STATUS_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,  
    })
  }
}