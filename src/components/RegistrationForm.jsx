import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const RegistrationForm = () => {
    const userRef = useRef();
    const errRef = useRef();

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
            const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }), 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log(response?.data);
            console.log(response?.access_token);
            console.log(JSON.stringify(response));
            setSuccess(true);
            
            setUser('');
            setPwd('');
            setMatchPwd('');
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
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
                    <h1>Registration Successful</h1>
                    
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
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
                                <span className={validName ? "valid" : "hide"}>
                                    <span className="ml-1 text-green-500">✔</span>
                                </span>

                                <span className={validName || !user ? "hide" : "invalid"}>
                                    <span className="ml-1 text-red-500">❌</span>
                                </span>
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
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <p className="text-xs italic text-red-500">Please enter a valid username.</p>
                            </p>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block mb-2 font-bold text-gray-700"
                            >
                                Password :
                                <span className={validPwd ? "valid" : "hide"}>
                                        <span className="ml-1 text-red-500">✔</span>
                                </span>

                                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                    <span className="ml-1 text-red-500">❌</span>
                                </span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                ref={passwordRef}
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <p className="text-xs italic text-red-500">Please enter a valid password.</p>
                            </p>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 font-bold text-gray-700"
                            >
                                Confirm Password

                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                        <span className="ml-1 text-red-500">✔</span>
                                </span>

                                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                    <span className="ml-1 text-red-500">❌</span>
                                </span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <p className="text-xs italic text-red-500">Must match the first password input field.</p>
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                disabled={!validName || !validPwd || !validMatch ? true : false}
                                type="submit"
                                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <p>
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