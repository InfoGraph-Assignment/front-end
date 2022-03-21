import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listRequests } from '../actions/requestsActions';
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


  return (
      <div class="flex flex-col">
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden ">
              <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead class="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="p-4">

                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Title
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Description
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Location
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Phone Number
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Status
                    </th>
                    <th scope="col" class="p-4">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

                  {requests.map((request) => {
                    return (
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="p-4 w-4">
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.title}</td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{request.description}</td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.location}</td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.contactPhone}</td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{request.status}</td>


                        <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}
