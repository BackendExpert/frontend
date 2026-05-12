import { CloudCogIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DefaultInput from '../../component/Form/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import { useAuth } from '../../context/AuthContext'
import useForm from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import Toast from '../../component/Toast/Toast'
import API from '../../services/api'
import Login from '../../assets/Login.jpg'

const VerifyOTP = () => {
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login, auth } = useAuth()
    const { values, handleChange } = useForm({ otp: '' })
    const [OtpToken, setOtpToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('otptoken')
        if (!token) {
            navigate("/", { replace: true })
            return
        }
        setOtpToken(token)
    }, [navigate])

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post(
                '/auth/verify-otp',
                { otp: values.otp.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${OtpToken}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            if (res.data.success) {
                login(res.data.token)
                localStorage.removeItem("otptoken")
                setToast({ success: true, message: res.data.message })

                if (auth?.role === "super_admin" || auth?.role === "institution_admin") {
                    setTimeout(() => navigate('/dashboard'), 2000)
                }
                else {
                    setTimeout(() => navigate('/profile'), 2000)
                }
            }
        } catch (err) {
            const message = err.response?.data?.error?.message || "Something went wrong"
            setToast({ success: false, message })
        } finally {
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

                {/* LEFT SIDE - IMAGE + CONTENT */}
                <div
                    className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden"
                    style={{
                        backgroundImage: `url(${Login})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative text-white max-w-lg px-10">
                        <h2 className="text-4xl font-semibold leading-tight">
                            Verification Required
                        </h2>
                        <p className="mt-6 text-white/80 text-lg leading-relaxed">
                            Enter the verification code sent to your email to confirm your identity and continue securely.
                        </p>
                        <div className="mt-10 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-white/60"></div>
                                <p className="text-white/80">Secure, one-time verification</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-white/60"></div>
                                <p className="text-white/80">Protects access to your account</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-white/60"></div>
                                <p className="text-white/80">Confirms account ownership</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - FORM */}
                <div className="w-full md:w-1/2 flex flex-col justify-between min-h-screen px-6 md:px-12">

                    <div className="flex text-indigo-500 items-center justify-center md:justify-start pt-6">
                        <CloudCogIcon className='h-7 w-7 md:h-8 md:w-8' />
                        <h1 className="font-bold text-lg md:text-xl pl-2">
                            <span className='text-gray-500'>Research</span>
                            <span className='uppercase'> Portal</span>
                        </h1>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-md text-center md:text-left">

                            <h1 className="uppercase tracking-[.25em] text-xl md:text-2xl">
                                Verify OTP
                            </h1>

                            <p className="pt-4 text-gray-500 text-sm md:text-base">
                                Enter the 8-digit verification code sent to your email address to continue.
                            </p>

                            <form onSubmit={handleVerifyOTP} className="mt-10 md:mt-12 space-y-6">

                                <DefaultInput
                                    label={"Enter OTP Code"}
                                    placeholder={"••••••••"}
                                    name={'otp'}
                                    value={values.otp}
                                    required
                                    onChange={handleChange}
                                />

                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Verifying...' : 'Verify & Continue'}
                                />

                            </form>

                        </div>
                    </div>

                    <div className="h-6 md:h-10"></div>
                </div>

            </div>
        </div>
    )
}

export default VerifyOTP