import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { listRequests } from '../actions/requestsActions';
import Loading from './Loading';
export default function MyRequests() {
  const userData = useSelector((state) => state.usersSignin);
  const { user } = userData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRequests(user.id, user.token));
  }, [])
  const requestsList = useSelector((state) => state.requestsList);
  const { requests, error, loading } = requestsList;

  console.log("requests", requests);
  console.log("error", error)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="flex flex-col">
      {requests.length > 0 ?
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
                        <tr className={classNames(request.status == "pending" ? 'bg-yellow-200 hover:bg-yellow-300 cursor-pointer' : request.status == "accepted" ? 'bg-green-200 hover:bg-green-300 cursor-pointer' : 'bg-red-200 hover:bg-red-300 cursor-pointer')}>
                          {/* <td className="p-2 w-2">
              </td> */}
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx + 1}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.title}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{request.description}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.location}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.contactPhone}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.status}</td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <Link to={`/myRequests/${request.id}`} className="text-blue-600 dark:text-blue-500 hover:underline">More Info</Link>
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
        :
        loading ?
        <Loading/>
        :

        <div className="flex flex-col mt-10 items-center justify-center">
          <h1 className="text-3xl text-gray-700 dark:text-gray-400">No Requests</h1>
        </div>
      }
    </div>
  )
}
