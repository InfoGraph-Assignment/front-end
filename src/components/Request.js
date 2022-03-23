import React, { useEffect, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from "react-redux";
import { listRequestsDetails, updateRequest } from "../actions/requestsActions";
import useForm from '../hooks/form';
import Loading from './Loading';

export default function Request() {
    const dispatch = useDispatch();
    const requestDetailsFromStore = useSelector((state) => state.requestsDetails);
    const userData = useSelector((state) => state.usersSignin);
    const updated = useSelector((state) => state.updateRequest);

    const { user } = userData;
    const { requestsDetails, loading, error } = requestDetailsFromStore;
    const { updatedRequest, loadingUpdate, errorUpdate } = updated;

    useEffect(() => {
        const RequestId = window.location.pathname.split("/")[2];
        if (user) {
            dispatch(listRequestsDetails(user.id, user.token, RequestId))
        }
    }, []);


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const handleUpdate = (data) => {
        setOpen(false)
        if (!data.title) {
            data.title = requestsDetails.title
        } else if (!data.description) {
            data.description = requestsDetails.description
        } else if (!data.location) {
            data.location = requestsDetails.location
        } else if (!data.contactPhone) {
            data.contactPhone = requestsDetails.contactPhone
        }

        dispatch(updateRequest(user.token, requestsDetails.id, data));
    }

    useEffect(() => {
        if (updatedRequest != {} && !loadingUpdate) {
            const RequestId = window.location.pathname.split("/")[2];
            dispatch(listRequestsDetails(user.id, user.token, RequestId))
            setOpen(false)
        }

    }, [updatedRequest])

    const { handleChange, handleSubmit } = useForm(handleUpdate);

    return (
        <div>
            {loading ?
              <Loading/>
                :
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 my-2 font-semibold text-gray-900 leading-8">
                        <span className="tracking-wide">Request Details</span>
                    </div>
                    <div className="text-gray-700 my-2">
                        <div className="grid md:grid-cols-1 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Status</div>
                                <div className={classNames(requestsDetails?.status === "pending" ? 'bg-yellow-300' : requestsDetails?.status === "accepted" ? 'bg-green-300' : 'bg-red-300', 'px-4 py-2 w-fit rounded-2xl')}>{requestsDetails?.status}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Title</div>
                                <div className="px-4 py-2">{requestsDetails?.title}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Description</div>
                                <div className="px-4 py-2">{requestsDetails?.description}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Time</div>
                                <div className="px-4 py-2">{requestsDetails?.time}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Location</div>
                                <div className="px-4 py-2">{requestsDetails?.location}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">{requestsDetails?.contactPhone}</div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                        onClick={() => setOpen(true)}
                    >

                        Update Request
                    </button>
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
                                                                defaultValue={requestsDetails?.title}
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
                                                                defaultValue={requestsDetails?.description}
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
                                                                defaultValue={requestsDetails?.location} onChange={handleChange}
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
                                                                defaultValue={requestsDetails?.contactPhone}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                        <button
                                                            type="submit"
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
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