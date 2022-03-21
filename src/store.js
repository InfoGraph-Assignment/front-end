import { createStore , combineReducers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {requestsListReducer ,requestsDetailsReducer } from './reducers/requestsReducers';
import {usersSignupReducer ,usersSigninReducer} from './reducers/usersReducers';
// import cookie from 'react-cookies';
// import { useDispatch, useSelector } from "react-redux";
// import { validateToken } from './actions/usersActions';


// const dispatch = useDispatch();

// const tokenFromCookies = cookie.load('token');
// if (tokenFromCookies) {
//     validateToken(tokenFromCookies);
// }
const reducers = combineReducers({
    requestsList : requestsListReducer ,
    requestsDetails : requestsDetailsReducer, 
    usersSignup : usersSignupReducer ,
    usersSignin : usersSigninReducer
});

const initialState = {};

const middleWare = [thunk];

const store  = createStore(reducers , initialState , composeWithDevTools(applyMiddleware(...middleWare)));

export default store;