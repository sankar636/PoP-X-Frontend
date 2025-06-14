import React from 'react'
import { useNavigate } from 'react-router-dom'
const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')"
            }}>
            <div className="w-full max-w-md  px-6 pb-10 flex flex-col justify-end h-screen md:h-[90vh]  bg-[#f7f8f9] shadow-lg">
                <div className="mt-auto mb-6">
                    <h1 className="text-2xl font-bold text-black">Welcome to PopX</h1>
                    <p className="mt-2 text-gray-500 text-md">
                        Lorem ipsum dolor sit amet,
                        <br /> consectetur adipiscing elit,
                    </p>
                </div>
                <div className="w-full space-y-3">
                    <button
                        onClick={() => navigate("/register")}
                        className="w-full py-3 bg-violet-600 text-white rounded-md font-semibold hover:bg-violet-700 transition cursor-pointer"
                    >
                        Create Account
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full py-3 bg-violet-200 text-black rounded-md font-semibold hover:bg-violet-300 transition cursor-pointer"
                    >
                        Already Registered? Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage