import React from 'react'
import UserDashNav from '../component/Dashboard/UserDashNav'
import { Outlet } from 'react-router-dom'

const UsersDashboard = () => {
    return (
        <div className=''>
            <div className="mb-4">
                <UserDashNav />
            </div>
            <div className="xl:max-w-7xl xl:mx-auto">
                <div className='mt-6 md:ml-8 ml-4 mr-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UsersDashboard