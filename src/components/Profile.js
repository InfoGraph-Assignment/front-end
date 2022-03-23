import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listRequests } from '../actions/requestsActions';

export default function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.usersSignin);
    const { requests, loading } = useSelector((state) => state.requestsList)
    const userImage = user?.image;

    useEffect(() => {
        dispatch(listRequests(user?.id, user?.token))
    }, [user])

    console.log("requests from profile = ", requests)
    return (
        <div class="container mx-auto my-5 p-5">
            <div class="md:flex no-wrap md:-mx-2 ">
                <div class="w-full md:w-3/12 md:mx-2">
                    <div class="bg-white p-3 border-t-4 border-grey-700">
                        <div class="image overflow-hidden">
                            {user?.image ? <img class="h-auto w-full mx-auto"
                                src={userImage}
                                alt={user?.userName} />
                                :
                                <img class="h-auto w-full mx-auto"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                                    alt="" />
                            }

                        </div>
                        <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{user?.userName}</h1>

                        <ul
                            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li class="flex items-center py-3">
                                <span>Status</span>
                                <span class="ml-auto"><span
                                    class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li class="flex items-center py-3">
                                <span>Member since</span>
                                <span class="ml-auto">{user?.createdAt}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="my-4"></div>

                </div>
                <div class="w-full md:w-9/12 mx-2 h-64">
                    <div class="bg-white p-3 shadow-sm rounded-sm">
                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span class="tracking-wide">About</span>
                        </div>
                        <div class="text-gray-700">
                            <div class="grid md:grid-cols-2 text-sm">
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">First Name</div>
                                    <div class="px-4 py-2">{user?.userName.split(" ")[0]}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Last Name</div>
                                    <div class="px-4 py-2">{user?.userName.split(" ")[1]}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Gender</div>
                                    <div class="px-4 py-2">{user?.gender}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                                    <div class="px-4 py-2">{user?.phone}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Current Address</div>
                                    <div class="px-4 py-2">{user?.address}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Permanant Address</div>
                                    <div class="px-4 py-2">{user?.address}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Email.</div>
                                    <div class="px-4 py-2">
                                        <a class="text-blue-800" href="mailto:jane@example.com">{user?.email}</a>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Birthday</div>
                                    <div class="px-4 py-2">{user?.birthDate}</div>
                                </div>
                            </div>
                        </div>
                        {/* <button
                            class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                            Full Information</button> */}
                    </div>

                    <div class="my-4"></div>

                    {/* <div class="w-full md:w-9/12 mx-2 h-50">
                        <div class="bg-white p-3 shadow-sm rounded-sm">
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span clas="text-green-500">
                                  
                                </span>
                                <span class="tracking-wide">My Requests</span>
                            </div>

                            <div className=''>
                                {requests &&
                                    requests.map((request, idx) => {
                                        return (
                                            <div key={idx} className='text-grey-700 border-2'>
                                                <div className='flex p-2'>
                                                    <div class="px-4 py-2 font-semibold">Title</div>
                                                    <div class="px-4 py-2">{request.title}</div>
                                                </div>
                                                <div className='flex p-2'>
                                                    <div class="px-4 py-2 font-semibold">Description</div>
                                                    <div class="px-4 py-2">{request.description}</div>
                                                </div>
                                                <button
                                                    class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                                                    Full Information</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div> */}
                </div>
            </div>
        </div>

    )
}
