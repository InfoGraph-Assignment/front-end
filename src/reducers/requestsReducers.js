import 
{
    REQUEST_LIST_REQUEST ,
    REQUEST_LIST_SUCCESS ,
    REQUEST_LIST_FAIL,
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,} from '../constants/requestsConstants';

export const requestsListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case REQUEST_LIST_REQUEST:
      return { loading: true, requests: [] };
    case REQUEST_LIST_SUCCESS:
      return { loading: false, requests: action.payload };
    case REQUEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const requestsDetailsReducer = (state = {requestsDetails :{}} , action) =>{
  switch(action.type){
    case REQUEST_DETAILS_REQUEST:
      return {loading: true , requestsDetails: {}}
    case REQUEST_DETAILS_SUCCESS:
      return {loading:false , requestsDetails: action.payload}
    case REQUEST_DETAILS_FAIL:
      return {loading: false , error : action.payload}
    default:
      return state;
  }
}