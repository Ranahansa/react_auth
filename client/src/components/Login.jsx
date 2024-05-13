import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'

const LOGIN_URL = '/login'

const Login = () => {

    const { setAuth } = useContext(AuthContext)

    const userRef = useRef()
    const errRef = useRef()


    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setError('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })

            const { accessToken, roles } = response?.data || {}

            if (accessToken && roles) {
                setAuth({ user, pwd, roles, accessToken })
                setUser('')
                setPwd('')
                setSuccess(true)
                navigate('/premium')
            } else {
                setError('Invalid response from the server')
            }
        } catch (err) {
            if (!err?.response) {
                setError('No Server Response')
            } else if (err.response?.status === 400) {
                setError('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setError('Unauthorized')
            } else {
                setError('Login Failed')
            }
            errRef.current.focus()
        }
    }

    return (
        <>
            {success ? (
                <section className="mt-20 text-center">
                    <h1 className="mb-4 text-2xl font-bold">You are logged in!</h1>
                    <p>
                        <a href="/" className="text-blue-500 hover:text-blue-700">
                            Go to Home
                        </a>
                    </p>
                </section>
            ) : (
                <div className="max-w-md mx-auto mt-20">
                    <p
                        ref={errRef}
                        className={`${error ? 'text-red-500' : 'hidden'} mb-4`}
                        aria-live="assertive"
                    >
                        {error}
                    </p>
                    <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block font-medium">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-medium">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Sign In
                        </button>
                        <button className='text-center text-blue-500' onClick={() => navigate('/register')}>
                            Register
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Login