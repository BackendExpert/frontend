import React, { useEffect, useRef, useState } from 'react'
import API from '../../services/api'
import { FaBell, FaInfo, FaList, FaUser } from 'react-icons/fa6'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

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

    // Close dropdown outside click
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

    const handleNavigate = (path) => {
        navigate(path)
        setOpen(false)
    }

    return (
        <div className='border-b border-gray-200 bg-white sticky top-0 z-40'>

            <div className='flex justify-between items-center px-8 py-4'>

                {/* Logo */}
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>
                        Research Portal
                    </h1>
                </div>

                {/* Right Side */}
                <div
                    className='flex items-center gap-5 relative'
                    ref={menuRef}
                >

                    {/* Notification */}
                    <button className='relative'>
                        <FaBell
                            size={20}
                            className='hover:text-gray-500 duration-300'
                        />

                        <span className='absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                    </button>

                    {/* Profile */}
                    <img
                        onClick={() => setOpen(!open)}
                        src={
                            profile?.profile_img
                                ? `${import.meta.env.VITE_APP_API_FILES}${profile.profile_img}`
                                : "/default-user.png"
                        }
                        alt="profile"
                        className='w-11 h-11 rounded-full object-cover cursor-pointer border-2 border-gray-200 hover:border-blue-400 duration-300'
                    />

                    {/* Dropdown */}
                    <div
                        className={`
                            absolute top-16 right-0 w-60 bg-white rounded-2xl
                            shadow-xl border border-gray-100 overflow-hidden
                            transition-all duration-300 origin-top-right
                            ${open
                                ? "opacity-100 scale-100 visible"
                                : "opacity-0 scale-95 invisible"}
                        `}
                    >

                        {/* User Info */}
                        <div className='p-4 border-b border-gray-100 bg-gray-50'>

                            <h1 className='font-semibold text-lg'>
                                Hi, {profile?.fname}
                            </h1>

                            <p className='text-sm text-gray-500 truncate'>
                                {profile?.bio}
                            </p>

                        </div>

                        {/* Menu */}
                        <div className='py-2'>

                            <button
                                onClick={() => handleNavigate('/profile')}
                                className='w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100 duration-200 text-left'
                            >
                                <FaUser size={16} />
                                My Profile
                            </button>

                            <button
                                onClick={() => handleNavigate('/saved')}
                                className='w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100 duration-200 text-left'
                            >
                                <FaList size={16} />
                                Saved List
                            </button>

                            <button
                                onClick={() => handleNavigate('/settings')}
                                className='w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100 duration-200 text-left'
                            >
                                <FiSettings size={16} />
                                Settings
                            </button>

                            <button
                                onClick={() => handleNavigate('/help')}
                                className='w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100 duration-200 text-left'
                            >
                                <FaInfo size={16} />
                                Help Center
                            </button>

                        </div>

                        {/* Logout */}
                        <div className='border-t border-gray-100'>

                            <button
                                onClick={handleLogout}
                                className='w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 duration-200 text-left'
                            >
                                <FiLogOut size={16} />
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserDashNav