import React, { useEffect } from 'react';
import useForm from '../../hooks/form';
import { useDispatch, useSelector } from "react-redux";
import { signIn, validateToken } from "../../actions/usersActions";
import cookies from 'react-cookies';
import { Form } from 'react-bootstrap';

export default function SignIn() {

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



  return (
    <div className=' w-4/4 flex justify-center mt-60'>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div>
          <label className='mr-2' >UserName</label>
          <input className='w-52 my-2 py-1 px-2 bg-gray-100' onChange={handleChange} type="email" name="email" placeholder='Type Your Email' />
        </div>
        <div>
          <label className='mr-2'>Password</label>
          <input className='w-52 my-2 py-1 px-2 bg-gray-100' onChange={handleChange} type="password" name="password" placeholder='Type Your Password' />
        </div>
        <button className=' bg-gray-500 w-20 ' type='submit'>Sign In</button>
      </form>
    </div>
  )
}
