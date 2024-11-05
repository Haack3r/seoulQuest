import React, { useEffect, useState } from 'react';
import Button from "../ui/Button";
import { getUserInfo, postUserInfoforEdit } from '../../api/myPageApi';
import { checkNickname } from "../../api/memberApi";

    const initState = {
        firstname: "",
        lastname: "",
        nickName: "",
        email: "",
        phoneNumber1: "",
        phoneNumber2: "",
        phoneNumber3: "",
        birthday: "",
        country: "",
        state: "",
        city: "",
        street: "",
        zipcode: "",
        password:"",
        newPassword: "",
        confirmPassword: "",
      };

const EditProfileComponent = () => {
    const [userInfo, setUserInfo] = useState({...initState});
    const [isCheckingNickname, setIsCheckingNickname] = useState(false);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New loading state

    useEffect(() => {
        getUserInfo().then((data) => {
            console.log(data);
            setUserInfo(data);
        });
    }, []);

    const handleChange = (e) => {
       setUserInfo({...userInfo, [e.target.name]:e.target.value})
    }

    const handleClickEditProfile = async (e) => {
        e.preventDefault();
        if (userInfo.newPassword !== userInfo.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        setIsLoading(true); // Start loading
        try {
            userInfo.password = userInfo.newPassword;
            console.log("보내는 정보", userInfo)
          await postUserInfoforEdit(userInfo);
          alert("Profile edited successfully!");
          setUserInfo({ ...initState });
        } catch (error) {
          console.error("Error occurred during profile editing:", error);
          alert("Failed to edit profile: " + error.message);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };

    
      const checkNicknameAvailability = async () => {
        setIsCheckingNickname(true);
        try {
          const response = await checkNickname(userInfo.nickName);
          setIsNicknameAvailable(response.includes("Available Nickname")); // Update based on response
          alert(response);
        } catch (error) {
          console.error("Error checking nickname availability:", error);
          alert("Error checking nickname availability.");
          setIsNicknameAvailable(false);
        } finally {
          setIsCheckingNickname(false);
        }
      };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full mt-20 mb-10 p-8 sm:p-10 md:p-8 lg:p-20 lg:w-1/2 bg-white rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
                    Edit Profile
                </h2>
                <form className="space-y-4">

                <div className="flex gap-6 items-center">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-gray-600" htmlFor="firstname">First Name</label>
                        <input
                            className="p-3 border border-gray-300 rounded shadow-sm"
                            disabled
                            name="firstname"
                            type="text"
                            value={userInfo.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-gray-600" htmlFor="lastname">Last Name</label>
                        <input
                            className="p-3 border border-gray-300 rounded shadow-sm"
                            disabled
                            name="lastname"
                            type="text"
                            value={userInfo.lastname}
                            onChange={handleChange}
                        />
                    </div>
                </div>


{/* 

                    <div className="flex items-center gap-2">
                        <label className="w-1/4 text-gray-600 mb-1" htmlFor="fullname">Full Name</label>
                        <input
                            disabled
                            className="flex-1 p-3 border border-gray-300 rounded shadow-sm"
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={userInfo.fullname}
                        />
                    </div> */}


                    <div className="flex items-center gap-2">
                        <label className="w-1/4 text-gray-600 mb-1" htmlFor="fullname">Email</label>
                        <input
                            disabled
                            className="flex-1 p-3 border border-gray-300 rounded shadow-sm"
                            id="email"
                            name="email"
                            type="text"
                            value={userInfo.email}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="w-1/4 text-gray-600 mb-1" htmlFor="fullname">Birthday</label>
                        <input
                            disabled
                            className="flex-1 p-3 border border-gray-300 rounded shadow-sm"
                            id="birthday"
                            name="birthday"
                            type="text"
                            value={userInfo.birthday}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-600 mb-1" htmlFor="nickName">Nickname</label>
                        <div className="flex space-x-2">
                            <input
                                className="flex-1 p-3 border border-gray-300 rounded shadow-sm"
                                id="nickName"
                                name="nickName"
                                type="text"
                                value={userInfo.nickName}
                                placeholder="Nickname"
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="w-1/3 p-3 md:w-1/5 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                onClick={checkNicknameAvailability}
                            >
                                Check
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
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
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-gray-600 mb-1" htmlFor="country">Country</label>
                            <input
                                className="p-3 border border-gray-300 rounded shadow-sm"
                                id="country"
                                name="country"
                                type="text"
                                value={userInfo.country}
                                onChange={handleChange}
                                placeholder="Country"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1" htmlFor="zipcode">Zipcode</label>
                            <input
                                className="p-3 border border-gray-300 rounded shadow-sm"
                                id="zipcode"
                                name="zipcode"
                                type="text"
                                value={userInfo.zipcode}
                                onChange={handleChange}
                                placeholder="Zipcode"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1" htmlFor="state">State</label>
                            <input
                                className="p-3 border border-gray-300 rounded shadow-sm"
                                id="state"
                                name="state"
                                type="text"
                                value={userInfo.state}
                                onChange={handleChange}
                                placeholder="state"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1" htmlFor="city">City</label>
                            <input
                                className="p-3 border border-gray-300 rounded shadow-sm"
                                id="city"
                                name="city"
                                type="text"
                                value={userInfo.city}
                                onChange={handleChange}
                                placeholder="city"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-600 mb-1" htmlFor="street">Street</label>
                            <input
                                className="p-3 border border-gray-300 rounded shadow-sm"
                                id="street"
                                name="street"
                                type="text"
                                value={userInfo.street}
                                onChange={handleChange}
                                placeholder="street"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-600 mb-1" htmlFor="newPassword">New Password</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded shadow-sm"
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={userInfo.newPassword || ""}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-600 mb-1" htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded shadow-sm"
                            id="confirmNewPassword"
                            name="confirmPassword"
                            type="password"
                            value={userInfo.confirmPassword || ""}
                            onChange={handleChange}
                            placeholder="Re-enter new password"
                            required
                        />
                    </div>


                    <Button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gray-700 text-white font-bold rounded"
                        onClick={handleClickEditProfile}
                    >
                        Edit Profile
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileComponent;
