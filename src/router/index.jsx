import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import CreateAuth from '../pages/Auth/CreateAuth'
import VerifyOTP from '../pages/Auth/VerifyOTP'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import UsersDashboard from '../layouts/UsersDashboard'
import Unauthorized from './Unauthorized'
import UserDash from '../pages/DashBoard/UserDashBoard/UserDash'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route index element={<CreateAuth />} /> 
                    <Route path='verify-password' element={<VerifyOTP /> } />
                    <Route path='unauthorized' element={<Unauthorized /> } />
                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'institution_admin']} ><Dashboard /></PrivateRoute>}>

                </Route>

                <Route path='/profile' element={<PrivateRoute roles={['super_admin', 'institution_admin', 'researcher', 'independent_researcher', 'supervisor', 'reviewer']}> <UsersDashboard /> </PrivateRoute>} >
                    <Route index element={<PrivateRoute roles={['super_admin', 'institution_admin', 'researcher', 'independent_researcher', 'supervisor', 'reviewer']}> <UserDash /> </PrivateRoute>} />
                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
