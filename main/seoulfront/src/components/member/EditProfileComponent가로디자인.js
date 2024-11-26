import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { getUserInfo, postUserInfoforEdit } from "../../api/myPageApi";
import { checkNickname } from "../../api/memberApi";
import { useNavigate } from "react-router-dom";

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
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const EditProfileComponent = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ ...initState });
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserInfo().then((data) => {
      console.log(data);
      setUserInfo(data);
    });
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleClickEditProfile = async (e) => {
    e.preventDefault();
    if (!userInfo.newPassword || !userInfo.confirmPassword) {
      alert("Please enter both the new password and the confirmation password.");
      return;
    }
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      alert("The new password and confirmation password do not match.");
      return;
    }
    setIsLoading(true);
    try {
      console.log("보내는 정보", userInfo);
      await postUserInfoforEdit(userInfo);
      const confirm = alert("Profile edited successfully!");
      if (confirm) {
        getUserInfo().then(() => {
          setUserInfo({ ...initState });
        });
      }
    } catch (error) {
      console.error("Error occurred during profile editing:", error);
      alert("Failed to edit profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkNicknameAvailability = async () => {
    setIsCheckingNickname(true);
    try {
      const response = await checkNickname(userInfo.nickName);
      setIsNicknameAvailable(response.includes("Available Nickname"));
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full mt-20 mb-10 p-8 sm:p-10 lg:p-20 bg-white rounded-lg shadow-lg max-w-7xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">
          Edit Profile
        </h2>
        <form className="space-y-8">
          {/* 전체 폼 가로 레이아웃 */}
          <div className="flex flex-wrap gap-8">
            {/* 왼쪽 섹션 */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="firstname">
                  First Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded shadow-sm"
                  disabled
                  name="firstname"
                  type="text"
                  value={userInfo.firstname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded shadow-sm"
                  disabled
                  name="lastname"
                  type="text"
                  value={userInfo.lastname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded shadow-sm"
                  disabled
                  id="email"
                  name="email"
                  type="text"
                  value={userInfo.email}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="birthday">
                  Birthday
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded shadow-sm"
                  disabled
                  id="birthday"
                  name="birthday"
                  type="text"
                  value={userInfo.birthday}
                />
              </div>
            </div>

            {/* 오른쪽 섹션 */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="nickName">
                  Nickname
                </label>
                <div className="flex items-center gap-4">
                  <input
                    className="flex-1 p-3 border border-gray-300 rounded shadow-sm"
                    id="nickName"
                    name="nickName"
                    type="text"
                    value={userInfo.nickName}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    className="p-3 bg-gray-400 text-white font-bold rounded-lg duration-300 transform hover:-translate-y-1"
                    onClick={checkNicknameAvailability}
                  >
                    Check
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded shadow-sm"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={userInfo.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 mb-1"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded shadow-sm"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* 하단 레이아웃 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="country">
                Country
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded shadow-sm"
                id="country"
                name="country"
                type="text"
                value={userInfo.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="zipcode">
                Zipcode
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded shadow-sm"
                id="zipcode"
                name="zipcode"
                type="text"
                value={userInfo.zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
              />
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              type="submit"
              className="py-3 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              onClick={handleClickEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              type="button"
              className="py-3 px-6 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500"
              onClick={() => navigate("/mypage")}
            >
              Go Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComponent;
