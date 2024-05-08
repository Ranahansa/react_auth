import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <Link
                    to="/register"
                    className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                    You want to register?
                </Link>
            </div>
        </div>
    );
};

export default Home;