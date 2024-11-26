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
    <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md p-14">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {`${userInfo.firstname} ${userInfo.lastname}`}
          </h1>
          <p className="text-sm text-gray-500">{userInfo.nickName}</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-500">
            {userInfo.firstname.charAt(0)}
          </span>
        </div>
      </div>

      {/* Personal Information Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-6 bg-white rounded-lg p-4 shadow-sm">
          <div>
            <p className="text-xs text-gray-500">First Name</p>
            <p className="text-base text-gray-800 font-medium">{userInfo.firstname}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Last Name</p>
            <p className="text-base text-gray-800 font-medium">{userInfo.lastname}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Email Address</p>
            <p className="text-base text-gray-800 font-medium">{userInfo.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-base text-gray-800 font-medium">{userInfo.phoneNumber1}</p>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
        <div className="grid grid-cols-2 gap-6 bg-white rounded-lg p-4 shadow-sm">
          <div>
            <p className="text-xs text-gray-500">Country</p>
            <p className="text-base text-gray-800 font-medium">{userInfo.country}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">City/State</p>
            <p className="text-base text-gray-800 font-medium">{`${userInfo.city}, ${userInfo.state}`}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Street</p>
            <p className="text-base text-gray-800 font-medium">{userInfo.street}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Postal Code</p>
            <p className="text-base text-gray-800 font-medium">{userInfo.zipcode}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPageComponent;
