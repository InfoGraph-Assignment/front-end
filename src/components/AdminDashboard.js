import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { allRequests } from '../actions/requestsActions';
import Loading from './Loading';
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';




export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.usersSignin);
    const { allRequestsData, loadingAll, errorAll } = useSelector((state) => state.allRequests);

    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [chartData, setData] = useState([]);
    const [chartOptions, setOptions] = useState({});
    useEffect(() => {
        dispatch(allRequests(user?.token));
    }, []);

    useEffect(() => {
        if (allRequestsData.length > 0) {
            let pending = allRequestsData.filter((request) => request.status === "pending");
            let approved = allRequestsData.filter((request) => request.status === "accepted");
            let rejected = allRequestsData.filter((request) => request.status === "rejected");
            setPendingRequests(pending);
            setApprovedRequests(approved);
            setRejectedRequests(rejected);

            setData([
                ["Task", "Hours per Day"],
                ["accepted", approved.length],
                ["rejected", rejected.length],
                ["pending", pending.length],
            ]);

            setOptions({
                title: "All Requests",
            })
        }
    }, [allRequestsData]);


    return (
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-grey-700">
                        <div className="image overflow-hidden">
                            {user?.image ? <img className="h-auto w-full mx-auto"
                                src={user.image}
                                alt={user?.userName} />
                                :
                                <img className="h-auto w-full mx-auto"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                                    alt="" />
                            }

                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user?.userName}</h1>

                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-1 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">{user?.userName.split(" ")[0]}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">{user?.userName.split(" ")[1]}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                    <div className="px-4 py-2">{user?.gender}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">{user?.phone}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Current Address</div>
                                    <div className="px-4 py-2">{user?.address}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                    <div className="px-4 py-2">{user?.address}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800" href="mailto:jane@example.com">{user?.email}</a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Birthday</div>
                                    <div className="px-4 py-2">{user?.birthDate}</div>
                                </div>
                            </div>
                        </div>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Member since</span>
                                <span className="ml-auto">{user?.createdAt}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="my-4"></div>

                </div>
                <div className="w-full md:w-9/12 mx-2 h-64">
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span className="tracking-wide">Admin Dashboard</span>
                        </div>


                    </div>

                    <div className="my-4"></div>

                    {
                        // loadingAll ?
                        //     <Loading />
                        //     :
                        // approvedRequests?.map((request) => {
                        //     return (
                        //         <h1>
                        //             hello
                        //         </h1>
                        //     )
                        // })
                        <Chart
                            chartType="PieChart"
                            data={chartData}
                            options={chartOptions}
                            width={"100%"}
                            height={"400px"}
                        />
                    }

                    <div className='flex justify-between'>
                        <Link className='w-1/4' to={`/AdminDashBoard/pending`}>
                            <button
                                className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                            >
                                Pendig Requests
                            </button>
                        </Link>
                        <Link className='w-1/4' to={`/AdminDashBoard/accepted`}>
                            <button
                                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Accepted Requests
                            </button>
                        </Link>

                        <Link className='w-1/4' to={`/AdminDashBoard/rejected`}>
                            <button
                                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Rejected Requests
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
