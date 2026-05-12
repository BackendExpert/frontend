import { CloudCogIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DefaultInput from '../../component/Form/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import { useNavigate } from 'react-router'
import Toast from '../../component/Toast/Toast'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Login from '../../assets/Login.jpg'
import { GiGraduateCap } from "react-icons/gi";

const CreateAuth = () => {
    const navigate = useNavigate()
    const { values, handleChange } = useForm({ email: '' });
    const [loading, setLoading] = useState(null)
    const [toast, setToast] = useState(false);

    const headleCreateAuth = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/auth/reqeust-otp', values, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.data.success) {
                localStorage.setItem('otptoken', res.data.token);
                setToast({ success: true, message: res.data.message });
                setTimeout(() => navigate('/verify-password'), 2000);
            } else {
                setToast({ success: false, message: res.data.error.message });
            }
        }
        catch (err) {
            const message = err.response?.data?.error?.message || 'Something went wrong';
            setToast({ success: false, message });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row min-h-screen">

                {/* LEFT SIDE */}
                <div className="w-full md:w-1/2 flex flex-col justify-between min-h-screen">

                    {/* Logo */}
                    <div className="p-6 md:p-8 flex text-indigo-500 items-center justify-center md:justify-start">
                        <GiGraduateCap className='h-7 w-7 md:h-8 md:w-8' />
                        <h1 className="font-bold text-lg md:text-xl pl-2">
                            <span className='text-gray-500'>My</span>
                            <span className='uppercase'> Research</span>
                        </h1>
                    </div>

                    {/* CENTER CONTENT */}
                    <div className="flex-1 flex items-center justify-center px-4">
                        <div className="w-full max-w-md text-center md:text-left">

                            <h1 className="uppercase tracking-[.25em] text-xl md:text-2xl">
                                welcome
                            </h1>
                            <p className="pt-4 text-gray-500 text-sm md:text-base leading-relaxed">
                                Sign in to access your personal research space, manage your academic work,
                                collaborate with peers, and stay connected with ongoing projects across the campus.
                                This platform helps you share publications, review research activities, and engage with
                                the academic community in a structured and meaningful way.
                            </p>
                            <form onSubmit={headleCreateAuth} className="mt-10 md:mt-12 space-y-6">

                                <DefaultInput
                                    label={"Enter Email Address"}
                                    placeholder={"username@example.com"}
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                />

                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Requesting...' : 'Continue'}
                                />

                            </form>

                        </div>
                    </div>

                    <div className="h-6 md:h-10"></div>
                </div>

                <div
                    className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden bg-black/70"
                >

                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${Login})` }}
                    ></div>


                    <div className="absolute inset-0 bg-black/60"></div>


                    <div className="relative text-white max-w-md px-10">

                        <h2 className="text-4xl font-semibold leading-tight">
                            A Space for Researchers & Learners
                        </h2>

                        <p className="mt-6 text-white/80 text-lg leading-relaxed">
                            Access a dedicated academic platform where students, lecturers, and researchers
                            can share work, explore ideas, and build meaningful collaborations.
                        </p>

                        <div className="mt-10 space-y-4">

                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-white/60"></div>
                                <p className="text-white/80">Browse research work and academic projects</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-white/60"></div>
                                <p className="text-white/80">Connect with students and academic staff</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-white/60"></div>
                                <p className="text-white/80">Share your findings and build your research profile</p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAuth