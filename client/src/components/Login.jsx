import React, { useEffect, useRef, useState } from 'react'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setError('')
    }, [user, password])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user === 'admin' && password === 'password') {
            setSuccess(true)
            setError('')
        } else {
            setError('Invalid username or password')
        }
    }

    return (
        <>
            {success ? (
                <section className="text-center mt-20">
                    <h1 className="text-2xl font-bold mb-4">You are logged in!</h1>
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
                    <h1 className="text-2xl font-bold mb-4">Sign In</h1>
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
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-medium">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Login