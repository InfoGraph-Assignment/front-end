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
} from '../constants/requestsConstants';

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

export const requestsDetailsReducer = (state = { requestsDetails: {} }, action) => {
  switch (action.type) {
    case REQUEST_DETAILS_REQUEST:
      return { loading: true, requestsDetails: {} }
    case REQUEST_DETAILS_SUCCESS:
      return { loading: false, requestsDetails: action.payload }
    case REQUEST_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const newRequestReducer = (state = { newRequest: {} }, action) => {
  switch (action.type) {
    case NEW_REQUEST_REQUEST:
      return { loadingNew: true, newRequest: {} };
    case NEW_REQUEST_SUCCESS:
      return { loadingNew: false, request: action.payload };
    case NEW_REQUEST_FAIL:
      return { loadingNew: false, error: action.payload };
    default:
      return state;
  }
}

export const updateRequestReducer = (state = { updateedRequest: {} }, action) => {
  switch (action.type) {
    case UPDATE_REQUEST_REQUEST:
      return { loadingUpdate: true, updatedRequest: {} };
    case UPDATE_REQUEST_SUCCESS:
      return { loadingUpdate: false, updatedRequest: action.payload };
    case UPDATE_REQUEST_FAIL:
      return { loadingUpdate: false, errorUpdate: action.payload };
    default:
      return state;
  }
}

export const allRequestsReducer = (state = { allRequestsData: [] }, action) => {
  switch (action.type) {
    case ALL_REQUESTS_REQUEST:
      return { loadingAll: true, allRequestsData: [] };
    case ALL_REQUESTS_SUCCESS:
      return { loadingAll: false, allRequestsData: action.payload };
    case ALL_REQUESTS_FAIL:
      return { loadingAll: false, errorAll: action.payload };
    default:
      return state;
  }
}


export const requestsByStatusReducer = (state = { requestsByStatusData: [] }, action) => {
  switch (action.type) {
    case REQUEST_ByStatus_REQUEST:
      return { loadingByStatus: true, requestsByStatusData: [] };
    case REQUEST_ByStatus_SUCCESS:
      return { loadingByStatus: false, requestsByStatusData: action.payload };
    case REQUEST_ByStatus_FAIL:
      return { loadingByStatus: false, requestsByStatusData: action.payload };
    default:
      return state;
  }
}

export const updateStatusReducer = (state = { updateStatusData: {} }, action) => {
  switch (action.type) {
    case UPDATE_STATUS_REQUEST:
      return { loadingUpdateStatus: true, updateStatusData: {} };
    case UPDATE_STATUS_SUCCESS:
      return { loadingUpdateStatus: false, updateStatusData: action.payload };
    case UPDATE_STATUS_FAIL:
      return { loadingUpdateStatus: false, errorUpdateStatus: action.payload };
    default:
      return state;
  }
}