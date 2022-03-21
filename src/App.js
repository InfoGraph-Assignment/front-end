import React from 'react';
import SignIn from './components/Forms/SignIn';
import Header from './components/Header/Header';
import MyRequests from './components/MyRequests';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.usersSignin);
  const { loginStatus, user, error, loading } = userDetails;
  return (
    <div>
      {loginStatus ? 
      <BrowserRouter>
     

      <Header />

    
      <Routes>
        <Route path="/" element={<h1>Hello World !</h1>} />
          <Route path="/myRequests" element={<MyRequests />} />
         
        </Routes>

     

      </BrowserRouter>
       : <SignIn />}

      {/* {
        loginStatus ?
        <>
      
        <Header />
          <h1>Welcome {user.userName}</h1>

          </>
          :
          <SignIn />
      } */}
    </div>
  )
}
