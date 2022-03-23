import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { requestByStatus, updateStatus } from '../actions/requestsActions';

import Loading from './Loading';
import { Link } from 'react-router-dom';

export default function ListRequests() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.usersSignin);
    const { requestsByStatusData, loading, error } = useSelector((state) => state.requestsByStatus);
    const { updateStatusData } = useSelector((state) => state.updateStatus);
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [requests, setRequests] = useState([]);
    const requestStatus = window.location.pathname.split("/")[2];
    const [selectedRequest, setSelectedRequest] = useState({});

    useEffect(() => {
        dispatch(requestByStatus(user?.token, requestStatus));

    }, [])



    const handleShow = (data) => {
        console.log("data = ", data)
        setOpen(true)
        setSelectedRequest(data)
    }
    useEffect(() => {
        setRequests(requestsByStatusData);
    }, [requestsByStatusData])

    const handleUpdate = (id, status) => {
        dispatch(updateStatus(user?.token, id, status));
        setOpen(false)
    }

    useEffect(() => {
        if (updateStatusData == "updated") {
            const RequestId = window.location.pathname.split("/")[2];
            dispatch(requestByStatus(user?.token, requestStatus));
            setOpen(false)
        }

    }, [updateStatusData])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div>
            {loading ?
                <Loading />
                :
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        {/* <th scope="col" className="p-4">
                    </th> */}
                                        <th scope="col" className="py-3 px-6 text-s font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            #
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            User
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Title
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Description
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Location
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-s font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Status
                                        </th>
                                        <th scope="col" className="p-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loading />
                                    :
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

                                        {requests.map((request, idx) => {

                                            return (
                                                <tr onClick={() => handleShow(request)} className={classNames(request.status == "pending" ? 'bg-yellow-200 hover:bg-yellow-300 cursor-pointer' : request.status == "accepted" ? 'bg-green-200 hover:bg-green-300 cursor-pointer' : 'bg-red-200 hover:bg-red-300 cursor-pointer')}>
                                                    {/* <td className="p-2 w-2">
                    </td> */}
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx + 1}</td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.User.userName}</td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.title}</td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{request.description}</td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.location}</td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.contactPhone}</td>
                                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.status}</td>
                                                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                }

                            </table>
                        </div>
                    </div>
                </div>
            }

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start ">

                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left  w-full">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Update Request
                                            </Dialog.Title>
                                            <div className="mt-2  w-full" >

                                                <div className="mt-8 space-y-6" >
                                                    <input type="hidden" name="remember" defaultValue="true" />
                                                    <div className="rounded-md shadow-sm -space-y-px">
                                                        <div className='flex justify-between items-center'>
                                                            <label className='w-1/4 font-semibold' >
                                                                User
                                                            </label>
                                                            <p
                                                                name="title"
                                                                type="text"
                                                                required
                                                                className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            >
                                                                {selectedRequest?.User?.userName}
                                                            </p>

                                                        </div>

                                                        <div className='flex justify-between items-center'>
                                                            <label className='w-1/4 font-semibold' >
                                                                Title
                                                            </label>
                                                            <p
                                                                name="title"
                                                                type="text"
                                                                required
                                                                className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            >
                                                                {selectedRequest.title}
                                                            </p>

                                                        </div>
                                                        <div className='flex justify-between items-center'>
                                                            <label className='w-1/4 font-semibold' >
                                                                Description
                                                            </label>
                                                            <p
                                                                name="title"
                                                                type="text"
                                                                required
                                                                className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            >
                                                                {selectedRequest.description}
                                                            </p>

                                                        </div>

                                                        <div className='flex justify-between items-center'>
                                                            <label className='w-1/4 font-semibold' >
                                                                Location
                                                            </label>
                                                            <p
                                                                name="title"
                                                                type="text"
                                                                required
                                                                className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            >
                                                                {selectedRequest.location}
                                                            </p>

                                                        </div>

                                                        <div className='flex justify-between items-center'>
                                                            <label className='w-1/4 font-semibold' >
                                                                Contact Number
                                                            </label>
                                                            <p
                                                                name="title"
                                                                type="text"
                                                                required
                                                                className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            >
                                                                {selectedRequest.contactPhone}
                                                            </p>

                                                        </div>

                                                        <div className='flex justify-between items-center'>
                                                            <label className='w-1/4 font-semibold' >
                                                                Status
                                                            </label>
                                                            <p
                                                                name="title"
                                                                type="text"
                                                                required
                                                                className="appearance-none rounded-none relative block w-3/4 px-3 py-2 my-3  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            >
                                                                {selectedRequest.status}
                                                            </p>

                                                        </div>

                                                    </div>

                                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                        {selectedRequest.status === 'pending' ?
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleUpdate(selectedRequest.id, "accepted")}
                                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-white font-medium bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                >
                                                                    Accept Request
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-white font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                    onClick={() => handleUpdate(selectedRequest.id, "rejected")}
                                                                    ref={cancelButtonRef}
                                                                >
                                                                    Reject Request
                                                                </button>
                                                            </>
                                                            :
                                                            null
                                                        }

                                                        <button
                                                            type="button"
                                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancle
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>


    )
}
