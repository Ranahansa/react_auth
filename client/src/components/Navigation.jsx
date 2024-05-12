import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div><nav className="bg-white py-3 rounded-md top-2 w-screen">
            <div className="container px-4 flex justify-between">
                <div className="text-white font-bold">My Blog</div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-black hover:text-gray-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-black hover:text-gray-300">
                            LogIn
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-black hover:text-gray-300">
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        </nav></div>
    )
}

export default Navigation