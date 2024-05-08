import React, { useRef, useState } from 'react';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
            const result = USER_REGEX.test(user);
            console.log(result);
            console.log(user);
            setValidName(result);
        }, [user]);

        useEffect(() => {
            const result = PWD_REGEX.test(pwd);
            console.log(result);
            console.log(pwd);
            setValidPwd(result);
            const match = pwd === matchPwd;
            setValidMatch(match);
        }, [pwd, matchPwd]);

        useEffect(() => {
            setErrMsg('');
        }, [user, pwd, matchPwd]);
        
    return (
        <section>
            <p ref={errRef} className={errMsg ? "error" : "offscreen"} aria-live="assertive">
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
                            <span className="ml-1 text-red-500">✔</span>
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
                        htmlFor="email"
                        className="block mb-2 font-bold text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block mb-2 font-bold text-gray-700"
                    >
                        Password :
                        <span className={validPwd ? "valid" : "hide"}>
                            <span className="ml-1 text-red-500">*</span>
                        </span>

                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <span className="ml-1 text-red-500">*</span>
                        </span>


                    </label>
                    <input
                        type="password"
                        id="password"
                        ref={userRef}
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
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs italic text-red-500">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
            </form>
        </section>

    );
};

export default RegistrationForm;