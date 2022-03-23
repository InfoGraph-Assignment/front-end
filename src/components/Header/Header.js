import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from "../Header/large_anyvehicle.png";
import { signOut } from '../../actions/usersActions';
import { useDispatch, useSelector } from "react-redux";

const navigation = [
    { name: 'My Requests', path: '/myRequests', current: true },
    { name: 'New Request', path: '/newRequest', current: true },
    //   { name: 'Projects', href: '#', current: false },
    //   { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.usersSignin);
    const { user } = userData;
    const signOutFunc = () => {
        dispatch(signOut());
    }
    return (

        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-4">
                        <div className="relative flex items-center justify-between h-20">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link to="/">
                                        <img
                                            className=" h-20 w-auto"
                                            src={logo}
                                            alt="Workflow"
                                        />
                                    </Link>

                                </div>
                                <div className="hidden sm:block sm:ml-10 h-20">
                                    <div className="flex space-x-4 h-20 items-center ">
                                        {navigation.map((item) => (
                                            <Link to={item.path}
                                                key={item.name}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="hidden sm:block sm:ml-10 h-20">
                                <div className="flex space-x-4 h-20 items-center  ">
                                    <span className='text-white'>
                                        New Request
                                    </span>
                                </div>
                            </div> */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>

                                            <img
                                                className="h-8 w-8 rounded-full bg-gray-100"
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>

                                                {({ active }) => (
                                                    <Link to="/profile"

                                                        className={classNames(active ? 'bg-gray-100' : '', ' block px-4 py-2 text-sm text-gray-700')}
                                                    >Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                            {user && user.role === 'admin' &&
                                                <Menu.Item>

                                                    {({ active }) => (
                                                        <Link to="/AdminDashBoard"

                                                            className={classNames(active ? 'bg-gray-100' : '', ' block px-4 py-2 text-sm text-gray-700')}
                                                        > Admin Dashboard
                                                        </Link>
                                                    )}
                                                </Menu.Item>}
                                            <Menu.Item>

                                                {({ active }) => (
                                                    <Link to="/" onClick={signOutFunc} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                        Sign out
                                                    </Link>
                                                )}

                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>

    );
}