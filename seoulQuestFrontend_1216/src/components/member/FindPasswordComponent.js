import React, { useState } from 'react';
import Button from "../ui/Button";
import { useNavigate } from 'react-router-dom';
import { findPassword } from '../../api/myPageApi';

const initState = { email: '', phoneNumber1: '', phoneNumber2: '', phoneNumber3: '' };

const FindPasswordComponent = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ ...initState });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const findPasswordHandler = () => {
        setIsLoading(true); 
        findPassword(userInfo)
            .then((data) => {
                if (data !== "No value present") {
                    setUserInfo({email:data});
                    setIsModalOpen(true);
                } else {
                    alert("check your details.");
                    setUserInfo({ ...initState });
                }
            })
            .catch((error) => {
                console.error("Error finding password:", error);
                alert("An error occurred. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false); 
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 mt-10">
            {/* Logo and Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-700">Seoulhwa</h1>
                <p className="text-lg text-gray-600 mt-2">Please enter the details for which you want to find the password.</p>
            </div>

            {/* 로딩 상태 표시 */}
            {isLoading ? (
                <div className="text-center text-lg font-bold text-gray-500">Loading...</div>
            ) : (
                // Input Fields
                <div className="w-full max-w-md">
                    <form id="findPasswordForm" className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Seoulhwa Email"
                            onChange={handleChange}
                            value={userInfo.email}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="phoneNumber1">Phone Number</label>
                        <div className="flex space-x-2">
                            <input
                                className="w-1/3 p-3 border border-gray-300 rounded shadow-sm"
                                id="phoneNumber1"
                                name="phoneNumber1"
                                type="tel"
                                value={userInfo.phoneNumber1}
                                onChange={handleChange}
                                required
                                minLength={3}
                                maxLength={3}
                                placeholder="010"
                            />
                            <span className="text-lg font-bold mt-2">-</span>
                            <input
                                className="w-1/3 p-3 border border-gray-300 rounded shadow-sm"
                                id="phoneNumber2"
                                name="phoneNumber2"
                                type="tel"
                                value={userInfo.phoneNumber2}
                                onChange={handleChange}
                                required
                                minLength={4}
                                maxLength={4}
                                placeholder="0000"
                            />
                            <span className="text-lg font-bold mt-2">-</span>
                            <input
                                className="w-1/3 p-3 border border-gray-300 rounded shadow-sm"
                                id="phoneNumber3"
                                name="phoneNumber3"
                                type="tel"
                                value={userInfo.phoneNumber3}
                                onChange={handleChange}
                                required
                                minLength={4}
                                maxLength={4}
                                placeholder="0000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* Submit Button */}
                        <Button
                            className="w-full p-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition duration-300"
                            onSubmit={findPasswordHandler}
                        >
                            Next
                        </Button>
                    </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Forgot your Email ?{' '}
                        <button 
                            className="text-gray-700 font-bold underline hover:text-gray-900"
                            onClick={() => navigate('/member/findemail')} 
                        >
                            Find Email
                        </button>
                    </div>

                    {/* Footer */}
                    <footer className="flex flex-row items-center justify-center mt-12 text-center text-xs text-gray-500">
                        <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => navigate('/')} 
                        >
                            Seoulhwa
                        </button>
                        <p className='pr-2 pl-2'>|</p>
                        <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => navigate('/contact')} 
                        >
                            Contact
                        </button>
                    </footer>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
                        <div className="text-2xl font-bold text-gray-700 mb-5 w-full">Your temporary password has been sent to "{userInfo.email}".</div>
                        <Button
                            onClick={()=> navigate("/member/login")}
                            className="mt-1 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition duration-300"
                        >
                            Go to Login
                        </Button>
                        <Button
                            onClick={closeModal}
                            className="mt-1 px-4 py-2 ml-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition duration-300"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindPasswordComponent;
