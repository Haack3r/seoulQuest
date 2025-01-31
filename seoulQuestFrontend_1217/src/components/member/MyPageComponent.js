import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/myPageApi";

const initState = {
  email: "",
  firstname: "",
  lastname: "",
  nickName: "",
  phoneNumber1: "",
  phoneNumber2: "",
  phoneNumber3: "",
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
    <div className="max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-10">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b pb-4">
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
        Hello, {userInfo.firstname}!
      </h1>
      <div className="mt-2">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
          {userInfo.nickName}
        </span>
      </div>
    </div>
  </div>
  {/* Personal Information Section */}
  <section className="mb-8">
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
      Personal Information
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-100 rounded-lg p-6 sm:p-8 shadow-sm">
      <div>
        <p className="text-xs sm:text-sm text-gray-500">First Name</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.firstname}
        </p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Last Name</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.lastname}
        </p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Email Address</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.email}
        </p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Phone</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.phoneNumber1}-{userInfo.phoneNumber2}-
          {userInfo.phoneNumber3}
        </p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Birthday</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.birthday}
        </p>
      </div>
    </div>
  </section>
  {/* Address Section */}
  <section>
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
      Address
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-100 rounded-lg p-6 sm:p-8 shadow-sm">
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Country</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.country}
        </p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">City/State</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {`${userInfo.city}, ${userInfo.state}`}
        </p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Street</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.street}
        </p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Postal Code</p>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          {userInfo.zipcode}
        </p>
      </div>
    </div>
  </section>
</div>

  );
};

export default MyPageComponent;
