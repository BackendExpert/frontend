import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import {
    FaGraduationCap,
    FaMapMarkerAlt,
    FaQuoteRight
} from 'react-icons/fa'
import { HiMiniAcademicCap } from 'react-icons/hi2'

const UserData = () => {

    const [profile, setProfile] = useState(null)
    const token = localStorage.getItem('token')

    const stats = [
        {
            label: "Research Score",
            value: profile?.researchScore || 0,
            style: "from-indigo-100 to-indigo-50 text-indigo-700"
        },
        {
            label: "Citations",
            value: profile?.citations || 0,
            style: "from-green-100 to-green-50 text-green-700"
        },
        {
            label: "h-index",
            value: profile?.hIndex || 0,
            style: "from-orange-100 to-orange-50 text-orange-700"
        },
        {
            label: "Followers",
            value: profile?.followers?.length || 0,
            style: "bg-gray-100 text-gray-900"
        },
        {
            label: "Following",
            value: profile?.followings?.length || 0,
            style: "bg-gray-100 text-gray-900"
        }
    ]

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/profile/my-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                if (res.data.success) setProfile(res.data.result)
            } catch (error) {
                console.error(error)
            }
        }
        if (token) fetchProfile()
    }, [token])

    const latestEducation =
        profile?.education?.[profile.education.length - 1]

    return (
        <div className='max-w-6xl mx-auto px-4 mt-6'>

            <div className='bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl overflow-hidden shadow-lg'>

                <div className='h-32 bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-500 relative'>

                    <div className='absolute -bottom-14 left-6'>
                        <img
                            src={`${import.meta.env.VITE_APP_API_FILES}${profile?.profile_img}`}
                            alt="profile"
                            className='w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl'
                        />
                    </div>

                </div>

                <div className='pt-20 px-6 pb-6'>

                    <div className='flex flex-col lg:flex-row gap-6 justify-between'>

                        <div className='flex-1'>

                            <h1 className='text-2xl font-bold text-gray-900'>
                                {profile?.title} {profile?.fname} {profile?.lname}
                            </h1>

                            <div className='flex items-start gap-2 mt-2 text-sm text-gray-500 max-w-xl'>
                                <FaQuoteRight size={12} className='mt-1 text-orange-400' />
                                <p className='leading-relaxed'>
                                    {profile?.bio || "No bio available"}
                                </p>
                            </div>

                            <div className='flex flex-wrap gap-2 mt-4 text-xs'>

                                <div className='flex items-center gap-2 bg-gray-100/80 px-3 py-2 rounded-xl'>
                                    <FaGraduationCap />
                                    {latestEducation?.course || "No Education"}
                                </div>

                                <div className='flex items-center gap-2 bg-gray-100/80 px-3 py-2 rounded-xl'>
                                    <HiMiniAcademicCap />
                                    {latestEducation?.institute_name || "No Institute"}
                                </div>

                                <div className='flex items-center gap-2 bg-gray-100/80 px-3 py-2 rounded-xl'>
                                    <FaMapMarkerAlt />
                                    {
                                        latestEducation
                                            ? `${latestEducation.city}, ${latestEducation.country}`
                                            : "No Location"
                                    }
                                </div>

                            </div>

                            <div className='flex flex-wrap gap-2 mt-4'>
                                {profile?.skills?.map((skill, index) => (
                                    <div
                                        key={index}
                                        className='px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 text-xs font-semibold shadow-sm'
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>

                            {stats.map((item, i) => (

                                <div
                                    key={i}
                                    className={`rounded-2xl p-4 text-center ${item.style.includes("from")
                                            ? `bg-gradient-to-br ${item.style}`
                                            : item.style
                                        }`}
                                >
                                    <h1 className='text-2xl font-bold'>
                                        {item.value}
                                    </h1>

                                    <p className='text-xs text-gray-600 mt-1'>
                                        {item.label}
                                    </p>
                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserData