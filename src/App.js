import React, { useState, useEffect } from 'react';
import SignIn from './components/Forms/SignIn';
import Header from './components/Header/Header';
import MyRequests from './components/MyRequests';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { validateToken } from './actions/usersActions';
import SignUp from './components/Forms/SignUp';
import Profile from './components/Profile';
import Request from './components/Request';
import NewRequest from './components/NewRequest';
import Home from './components/Home';
import cookies from "react-cookies"
import { useJwt } from "react-jwt"
import AdminDashboard from './components/AdminDashboard';
import ListRequests from './components/ListRequests';


export default function App() {
  const dispatch = useDispatch();


  let tokenFromCookies = cookies.load("token");
  const { decodedToken, isExpired } = useJwt(tokenFromCookies);
  useEffect(() => {
    if (decodedToken) {
      decodedToken.token = tokenFromCookies.split(`"`)[1];
      dispatch(validateToken(decodedToken))
    }
  }, [decodedToken])



  const [toggleSign, setToggleSign] = useState(false)

  const toggleSignFunc = () => {

    if (toggleSign) {
      setToggleSign(false)
    } else {
      setToggleSign(true)
    }
  }
  const userDetails = useSelector((state) => state.usersSignin);
  const { loginStatus, user, error, loading } = userDetails;
  console.log("loginStatus = ", loginStatus)
  return (
    // <div>
    //   {loginStatus ? 
    //   <BrowserRouter>


    //   <Header />


    //   <Routes>
    //     <Route path="/" element={<h1>Main Page</h1>} />
    //       <Route path="/myRequests" element={<MyRequests />} />
    //       <Route path="/profile" element={<Profile/> } />

    //     </Routes>



    //   </BrowserRouter>
    //    : 
    //    toggleSign ?
    //     <SignUp toggleSignFunc={toggleSignFunc}/> :
    //    <SignIn toggleSignFunc={toggleSignFunc}/>
    //    }

    // </div>
    <div>
      <BrowserRouter>
      {loginStatus ?
      <Header />: null}
        <Routes>

          {loginStatus ?
            <>
            
              <Route path="/" element={<Home/>} />
              <Route path="/myRequests" element={<MyRequests />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/myRequests/:id' element={<Request />} />
              <Route path='/newRequest' element={<NewRequest />} />
              <Route path="/AdminDashBoard" element={<AdminDashboard/>} />
              <Route path="AdminDashBoard/:status" element={<ListRequests/>} />
            </>
            :
              toggleSign ?
              <Route  path="/" element={<SignUp toggleSignFunc={toggleSignFunc} />} /> :
              <Route  path="/" element={<SignIn toggleSignFunc={toggleSignFunc} />} /> 
          }

        </Routes>
      </BrowserRouter>
    </div>
  )
}
