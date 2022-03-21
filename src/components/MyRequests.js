import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listRequests } from '../actions/requestsActions';
export default function MyRequests() {
    const userData = useSelector((state) => state.usersSignin);
    const { user } = userData;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listRequests(user.id , user.token));
    },[])
    const requestsList = useSelector((state) => state.requestsList);
    const {  requests, error, loading } = requestsList;

    console.log("requests", requests);
  

  return (
    <div>

    </div>
  )
}
