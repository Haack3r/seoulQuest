import React, { useState } from "react";
import Button from "../ui/Button";
import { registerMember, checkEmail, checkNickname } from "../../api/memberApi";

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
  confirmPassword: "",
};

const SignUpComponent = () => {
  const [signUpParam, setSignUpParam] = useState({ ...initState });
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setSignUpParam({ ...signUpParam, [e.target.name]: e.target.value });
  };

  const handleClickSignUp = async (e) => {
    e.preventDefault();
    if (signUpParam.password !== signUpParam.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      await registerMember(signUpParam);
      alert("Registration successful!");
      setSignUpParam({ ...initState });
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Registration failed: " + error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const checkEmailAvailability = async () => {
    setIsCheckingEmail(true);
    try {
      const response = await checkEmail(signUpParam.email);
      setIsEmailAvailable(response.includes("가입가능")); // Update based on response
      alert(response);
    } catch (error) {
      console.error("Error checking email availability:", error);
      alert("Error checking email availability.");
      setIsEmailAvailable(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const checkNicknameAvailability = async () => {
    setIsCheckingNickname(true);
    try {
      const response = await checkNickname(signUpParam.nickName);
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
    <div className="min-h-screen flex ">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#E0DCD0" }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-20">
          <h1 className="text-4xl font-bold text-white tracking-wide mb-4">
            Experience Seoul, Beyond Sightseeing
          </h1>
          <p className="text-lg font-light text-white">
            Seoul isn’t just a city—it’s a feeling. Join our curated tours and
            shop exclusive gifts, crafted to capture the spirit of Korea.
            Explore, enjoy, and bring home a piece of Seoul.
          </p>
        </div>
      </div>

      <div className="w-full mt-8 p-8 sm:p-10 md:p-8 lg:p-20 lg:w-1/2">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={handleClickSignUp}>
          <div className="grid grid-cols-2 gap-2">
            <input
              className="p-3 border border-gray-300 rounded shadow-sm"
              name="firstname"
              type="text"
              value={signUpParam.firstname}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              className="p-3 border border-gray-300 rounded shadow-sm"
              name="lastname"
              type="text"
              value={signUpParam.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="flex space-x-2">
            <input
              className="flex-1 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              name="nickName"
              type="text"
              value={signUpParam.nickName}
              onChange={handleChange}
              placeholder="Nickname"
              required
            />
            <button
              type="button"
              onClick={checkNicknameAvailability}
              disabled={isCheckingNickname}
              className="w-1/3 p-3 md:w-1/5 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              {isCheckingNickname ? "Checking..." : "Check"}
            </button>
          </div>

          <div className="flex space-x-2">
            <input
              className="flex-1 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              name="email"
              type="email"
              value={signUpParam.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <button
              type="button"
              onClick={checkEmailAvailability}
              disabled={isCheckingEmail}
              className="w-1/3 p-3 md:w-1/5 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              {isCheckingEmail ? "Checking..." : "Check"}
            </button>
          </div>

          <div className="flex space-x-2">
            <input
              className="w-1/3 p-3 border border-gray-300 rounded shadow-sm"
              name="phoneNumber1"
              type="tel"
              value={signUpParam.phoneNumber1}
              onChange={handleChange}
              placeholder="010"
              required
              minLength={3} // Minimum digits
              maxLength={3} // Maximum digits
            />
            <span className="text-lg font-bold mt-2">-</span>
            <input
              className="w-1/3 p-3 border border-gray-300 rounded shadow-sm"
              name="phoneNumber2"
              type="tel"
              value={signUpParam.phoneNumber2}
              onChange={handleChange}
              placeholder="0000"
              required
              minLength={4} // Minimum digits
              maxLength={4} // Maximum digits
            />
            <span className="text-lg font-bold mt-2">-</span>
            <input
              className="w-1/3 p-3 border border-gray-300 rounded shadow-sm"
              name="phoneNumber3"
              type="tel"
              value={signUpParam.phoneNumber3}
              onChange={handleChange}
              placeholder="0000"
              required
              minLength={4} // Minimum digits
              maxLength={4} // Maximum digits
            />
          </div>

          <input
            className="w-full p-3 border border-gray-300 rounded shadow-sm"
            name="birthday"
            type="date"
            value={signUpParam.birthday}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              className="p-3 border border-gray-300 rounded shadow-sm"
              name="country"
              type="text"
              value={signUpParam.country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
            <input
              className="p-3 border border-gray-300 rounded shadow-sm "
              name="zipcode"
              type="text"
              value={signUpParam.zipcode}
              onChange={handleChange}
              placeholder="Zipcode"
              required
            />
            <input
              className="p-3 border border-gray-300 rounded shadow-sm"
              name="state"
              type="text"
              value={signUpParam.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <input
              className="p-3 border border-gray-300 rounded shadow-sm"
              name="city"
              type="text"
              value={signUpParam.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              className="p-3 border border-gray-300 rounded shadow-sm col-span-2"
              name="street"
              type="text"
              value={signUpParam.street}
              onChange={handleChange}
              placeholder="Street"
              required
            />
          </div>

          <input
            className="w-full p-3 border border-gray-300 rounded shadow-sm"
            name="password"
            type="password"
            value={signUpParam.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded shadow-sm"
            name="confirmPassword"
            type="password"
            value={signUpParam.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-4 bg-gray-700 text-white font-bold rounded"
            onClick={handleClickSignUp}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <a className="font-semibold underline" href="/member/login/">
              Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
