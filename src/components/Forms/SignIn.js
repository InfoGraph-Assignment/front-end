import React, { useEffect } from 'react';
import useForm from '../../hooks/form';
import { useDispatch, useSelector } from "react-redux";
import { signIn, validateToken } from "../../actions/usersActions";
import cookies from 'react-cookies';
import { Form } from 'react-bootstrap';
import { LockClosedIcon } from '@heroicons/react/solid';
import logo from "./large_anyvehicle.png"
import Loading from '../Loading';

export default function SignIn(props) {

  useEffect(() => {
    let tokenFromCookies = cookies.load('token');
    if (tokenFromCookies) {
      dispatch(validateToken(tokenFromCookies));
    }

  }, [])
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.usersSignin);
  const { loginStatus, user, error, loading } = userDetails;



  const signInFunction = (values) => {
    const { email, password } = values;
    dispatch(signIn(email, password));
  }
  const { handleChange, handleSubmit } = useForm(signInFunction);

  const toggleHandler = () => {
    props.toggleSignFunc();
  }

  return (
    <>

      {loading ?
        <Loading />
        :
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-22 w-auto"
                src={logo}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6" >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
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
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={handleChange}

                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>


              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-sm">
              Don't have an account ?
              <a onClick={toggleHandler} className="font-medium text-indigo-600 hover:text-indigo-500">
                sign Up
              </a>
            </div>
          </div>
        </div>
      }
    </>
  )
}
