import React, { useEffect } from 'react';
import useForm from '../../hooks/form';
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/usersActions";
import cookies from 'react-cookies';
import { Form } from 'react-bootstrap';
import { LockClosedIcon } from '@heroicons/react/solid';
import logo from "./large_anyvehicle.png"

export default function SignUp(props) {

 
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.usersSignin);
  const { loginStatus, user, error, loading } = userDetails;



  const signUpFunction = (values) => {
        props.toggleSignFunc();
    dispatch(signUp(values));
  }
  const { handleChange, handleSubmit } = useForm(signUpFunction);

  const toggleHandler = ()=>{
    props.toggleSignFunc();
  }

  return (
     
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-22 w-auto"
            src={logo}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for free</h2>
        
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="email-address" className="sr-only">
               First Name
              </label>
              <input
                id="email-address"
                name="firstName"
                type="text"
                // autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Firat Name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Last Name
              </label>
              <input
                id="email-address"
                name="lastName"
                type="text"
                // autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Phone Number
              </label>
              <input
                id="email-address"
                name="phone"
                type="text"
                // autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}

              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Address
              </label>
              <input
                id="password"
                name="address"
                type="text"
                // autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
                onChange={handleChange}

              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Gender
              </label>
              <input
                id="password"
                name="gender"
                type="text"
                // autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Gender"
                onChange={handleChange}

              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
              Birth Date
              </label>
              <input
                id="password"
                name="birthDate"
                type="date"
                // autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 scroll-my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Birth Date"
                onChange={handleChange}

              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-sm">
            You already have an account ?
              <a onClick={toggleHandler} className="font-medium text-indigo-600 hover:text-indigo-500">
                sign In
              </a>
            </div>
        
      </div>
    </div>

  )
}
