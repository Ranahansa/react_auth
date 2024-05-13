import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const RegistrationForm = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setSuccess(true);
                setUser('');
                setPwd('');
                setMatchPwd('');

                navigate('/login');
            } else {
                setErrMsg(response.data.message || 'Registration Failed');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Request Body');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Registration Successful!</h1>
                    <p>You will be redirected to the login page shortly.</p>
                </section>
            ) : (
                <section className='mt-10'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1 className="text-4xl font-bold text-center">Registration Form</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md px-8 pt-6 pb-8 mx-auto mt-10 mb-4 bg-white rounded shadow-md"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block mb-2 font-bold text-gray-700"
                            >
                                Username :
                                    {user && (
                                        validName ? (
                                            <span className="valid">✔</span>
                                        ) : (
                                            <span className="invalid">❌</span>
                                        )
                                    )}
                            </label>
                                
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {userFocus && user && !validName && (
                                <p id="uidnote" className="instructions">
                                    <p className="text-xs italic text-red-500">Please enter a valid username.</p>
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block mb-2 font-bold text-gray-700"
                            >
                                Password :
                                    {pwd && (
                                        validPwd ? (
                                            <span className="valid">✔</span>
                                        ) : (
                                            <span className="invalid">❌</span>
                                        )
                                    )}
                            </label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {pwdFocus && pwd && !validPwd && (
                                <p id="pwdnote" className="instructions">
                                    <p className="text-xs italic text-red-500">Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be between 8-24 characters long.</p>
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 font-bold text-gray-700"
                            >
                                Confirm Password :

                                    {matchPwd && (
                                        validMatch && matchPwd ? (
                                            <span className="valid">✔</span>
                                        ) : (
                                            <span className="invalid">❌</span>
                                        )
                                    )}
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                disabled={!validPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
                            />
                            {matchFocus && !validMatch && matchPwd && (
                                <p id="confirmnote" className="instructions">
                                    <p className="text-xs italic text-red-500">Passwords do not match.</p>
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={!validName || !validPwd || !validMatch}
                                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <p className='text-center text-gray-500'>
                        Already have an account?
                        <Link to="/login" className="ml-1 text-blue-500 transition-colors duration-300 hover:text-blue-800">
                            Login
                        </Link>
                    </p>
                </section>
            )}
        </>
    );
};

export default RegistrationForm;