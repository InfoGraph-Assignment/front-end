import React, { useState, useEffect } from 'react';
import SignIn from './components/Forms/SignIn';
import Header from './components/Header/Header';
import MyRequests from './components/MyRequests';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { validateToken } from './actions/usersActions';
import SignUp from './components/Forms/SignUp';
import Profile from './components/Profile';
import cookies from "react-cookies"
import { useJwt } from "react-jwt"

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
            
              <Route path="/" element={<h1>Main Page</h1>} />
              <Route path="/myRequests" element={<MyRequests />} />
              <Route path="/profile" element={<Profile />} />
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
