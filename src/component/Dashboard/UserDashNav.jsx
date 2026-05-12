import React, { useEffect, useRef, useState } from 'react'
import API from '../../services/api'
import { FaBell, FaInfo, FaList, FaUser } from 'react-icons/fa6'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import DefaultInput from '../Form/DefaultInput'

const UserDashNav = () => {

    const [profile, setProfile] = useState(null)
    const [open, setOpen] = useState(false)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()
    const menuRef = useRef()

    useEffect(() => {

        const fetchProfile = async () => {
            try {

                const res = await API.get(
                    '/profile/my-profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                )

                if (res.data.success) {
                    setProfile(res.data.result)
                }

            } catch (error) {
                console.error("Failed to fetch profile:", error)
            }
        }

        if (token) {
            fetchProfile()
        }

    }, [token])

    // Close dropdown when clicking outside
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }

    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="">
            <div className='flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white'>

                <div className=''>
                    <h1 className="text-2xl font-bold">
                        Research Portal
                    </h1>
                </div>

                <div className='flex items-center gap-5 relative' ref={menuRef}>

                    {/* Notification */}
                    <a href="">
                        <FaBell
                            size={20}
                            className='hover:fill-gray-500 duration-300'
                        />
                    </a>

                    {/* Profile Image */}
                    <img
                        onClick={() => setOpen(!open)}
                        src={`${import.meta.env.VITE_APP_API_FILES}${profile?.profile_img}`}
                        alt="profile"
                        className='w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-gray-200 hover:border-gray-400 duration-300'
                    />


                    {
                        open && (
                            <div className='absolute top-14 right-0 w-52 bg-white shadow-lg border border-gray-200 overflow-hidden z-50'>

                                <div className="p-4 border-b border-gray-100">
                                    <h1 className="">Hi, {profile?.fname}</h1>
                                </div>

                                <div className="border-b border-gray-100">
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:border-l hover:border-blue-500 duration-200 text-left'
                                    >
                                        <FaUser size={18} />
                                        My Profile
                                    </button>

                                    <button
                                        onClick={() => navigate('/profile')}
                                        className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:border-l hover:border-blue-500 duration-200 text-left'
                                    >
                                        <FaList size={18} />
                                        Saved List
                                    </button>
                                </div>


                                <div className="border-b border-gray-100">

                                    <button
                                        onClick={() => navigate('/settings')}
                                        className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:border-l hover:border-blue-500 duration-200 text-left'
                                    >
                                        <FiSettings size={18} />
                                        Settings
                                    </button>
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:border-l hover:border-blue-500 duration-200 text-left'
                                    >
                                        <FaInfo size={18} />
                                        Help Center
                                    </button>
                                </div>


                                <button
                                    onClick={handleLogout}
                                    className='w-full flex items-center gap-3 px-4 py-3 hover:bg-red-100 hover:border-l hover:border-red-500 text-red-600 duration-200 text-left'
                                >
                                    <FiLogOut size={18} />
                                    Logout
                                </button>

                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default UserDashNav