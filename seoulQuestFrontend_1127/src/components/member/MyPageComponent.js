import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/myPageApi";

const initState = {
  email: "",
  firstname: "",
  lastname: "",
  nickName: "",
  phoneNumber1: "",
  country: "",
  city: "",
  state: "",
  street: "",
  zipcode: "",
};

const MyPageComponent = () => {
  const [userInfo, setUserInfo] = useState({ ...initState });

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-500">
            {userInfo.firstname.charAt(0)}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {`${userInfo.firstname} ${userInfo.lastname}`}
          </h1>
          <p className="text-sm text-gray-500">{userInfo.nickName}</p>
        </div>
      </div>

      {/* Personal Information Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="text-base text-gray-800">{userInfo.firstname}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="text-base text-gray-800">{userInfo.lastname}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-base text-gray-800">{userInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-base text-gray-800">{userInfo.phoneNumber1}</p>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="text-base text-gray-800">{userInfo.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City/State</p>
            <p className="text-base text-gray-800">{`${userInfo.city}, ${userInfo.state}`}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Street</p>
            <p className="text-base text-gray-800">{userInfo.street}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Postal Code</p>
            <p className="text-base text-gray-800">{userInfo.zipcode}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPageComponent;
