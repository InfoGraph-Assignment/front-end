import React from 'react';
import useForm from '../hooks/form';
import { useDispatch, useSelector } from "react-redux";
import { newRequest } from '../actions/requestsActions';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function NewRequest() {

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.usersSignin);
    const newReqResponse = useSelector((state) => state.newRequest);
    const { loadingNew } = newReqResponse
    const { loginStatus, user, error, loading } = userDetails;

    const onSubmit = (data) => {
        data.userId = user.id;
        dispatch(newRequest(user.token, data));
    }

    const { values, handleChange, handleSubmit } = useForm(onSubmit);

    return (
        <>

            {loadingNew ?
                <Loading />
                :
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <h1 className='text-xl font-bold text-center'>Send New Request</h1>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6" >
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className='flex justify-between items-center'>
                                    <label className='w-1/4 font-semibold' >
                                        Title
                                    </label>
                                    <input
                                        name="title"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Title"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex justify-between items-center'>
                                    <label className='w-1/4 font-semibold' >
                                        Description
                                    </label>
                                    <input
                                        name="description"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Description ..."
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex justify-between items-center'>
                                    <label className='w-1/4 font-semibold' >
                                        Location
                                    </label>
                                    <input
                                        name="location"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Description ..."
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex justify-between items-center'>
                                    <label className='w-1/4 font-semibold' >
                                        Contact No.
                                    </label>
                                    <input
                                        name="contactPhone"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Contact No."
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Send Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
