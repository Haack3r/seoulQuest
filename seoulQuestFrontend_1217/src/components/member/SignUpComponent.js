import React, { useState } from "react";
import Button from "../ui/Button";
import { registerMember, checkEmail, checkNickname } from "../../api/memberApi";
import { Link, useNavigate } from "react-router-dom"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale"; // English locale


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
  const navigate = useNavigate(); 
  const [signUpParam, setSignUpParam] = useState({ ...initState });
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setSignUpParam({ ...signUpParam, [e.target.name]: e.target.value });
  };

  const handleBirthdayChange = (date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    setSignUpParam({ ...signUpParam, birthday: formattedDate });
  };

  const handleClickSignUp = async (e) => {
    e.preventDefault();
  
    // Check if any field in signUpParam is empty
    for (const key in signUpParam) {
      if (!signUpParam[key].trim()) {
        alert(`Please fill in all fields. The "${key}" field is required.`);
        return; // Stop the function execution if any field is empty
      }
    }
  
    if (signUpParam.password !== signUpParam.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    setIsLoading(true);
    try {
      await registerMember(signUpParam);
      alert("Registration successful!");
      setSignUpParam({ ...initState });
      navigate("/member/login");
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Registration failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const checkEmailAvailability = async () => {
    // Email format validation using regex
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(signUpParam.email)) {
      alert("Please enter a valid email address (e.g., 123@domain.com)");
      return; // Stop the function if email format is invalid
    }
  
    // Existing logic remains intact
    setIsCheckingEmail(true);
    try {
      const response = await checkEmail(signUpParam.email);
      setIsEmailAvailable(response.includes("This email is available"));
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
    // Nickname validation: Check if nickname is empty
    if (!signUpParam.nickName.trim()) {
      alert("Please enter a valid nickname before checking availability.");
      return; // Stop the function if nickname is empty
    }
  
    // Existing logic remains intact
    setIsCheckingNickname(true);
    try {
      const response = await checkNickname(signUpParam.nickName);
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#E0DCD0] text-gray-800">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-2xl font-bold mb-4">
            Experience Seoul, Beyond Sightseeing
          </h1>
          <p className="text-sm leading-6">
            Seoul isn’t just a city—it’s a feeling. Join our curated tours and
            shop exclusive gifts, crafted to capture the spirit of Korea.
            Explore, enjoy, and bring home a piece of Seoul.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full p-6 lg:w-1/2 bg-white mt-20 lg:px-20">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
          Sign Up
        </h2>
        <form className="space-y-3" onSubmit={handleClickSignUp}>
          {/* Name Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <input
              className="p-2 border border-gray-300 rounded text-sm"
              name="firstname"
              type="text"
              value={signUpParam.firstname}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              className="p-2 border border-gray-300 rounded text-sm"
              name="lastname"
              type="text"
              value={signUpParam.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>

          {/* Nickname Input */}
          <div className="flex space-x-2">
            <input
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
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
              className="p-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
            >
              {isCheckingNickname ? "Checking..." : "Check"}
            </button>
          </div>

          {/* Email Input */}
          <div className="flex space-x-2">
            <input
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              name="email"
              type="email"
              value={signUpParam.email}
              onChange={handleChange}
              placeholder="Email"
              pattern="^[^@]+@[^@]+\.[^@]+$" // Regex for basic email validation
              title="Please enter a valid email address (e.g., 123@domain.com)"
              required
            />
            <button
              type="button"
              onClick={checkEmailAvailability}
              disabled={isCheckingEmail}
              className="p-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
            >
              {isCheckingEmail ? "Checking..." : "Check"}
            </button>
          </div>

          {/* Phone Number Input */}
          <div className="flex space-x-2">
            <input
              className="w-1/3 p-2 border border-gray-300 rounded text-sm"
              name="phoneNumber1"
              type="number"
              inputMode="numeric"
              value={signUpParam.phoneNumber1}
              onChange={(e) => {
                const value = e.target.value.slice(0, 3); // Limit to 3 digits
                setSignUpParam({ ...signUpParam, phoneNumber1: value });
              }}
              placeholder="010"
              required
            />
            <span className="text-sm font-bold">-</span>
            <input
              className="w-1/3 p-2 border border-gray-300 rounded text-sm"
              name="phoneNumber2"
              type="number"
              inputMode="numeric"
              value={signUpParam.phoneNumber2}
              onChange={(e) => {
                const value = e.target.value.slice(0, 4); // Limit to 4 digits
                setSignUpParam({ ...signUpParam, phoneNumber2: value });
              }}
              placeholder="0000"
              required
            />
            <span className="text-sm font-bold">-</span>
            <input
              className="w-1/3 p-2 border border-gray-300 rounded text-sm"
              name="phoneNumber3"
              type="tel"
              inputMode="numeric"
              value={signUpParam.phoneNumber3}
              onChange={(e) => {
                const value = e.target.value.slice(0, 4); // Limit to 4 digits
                setSignUpParam({ ...signUpParam, phoneNumber3: value });
              }}
              placeholder="0000"
              required
            />
          </div>
          {/* Birthday Input */}
          <div className="w-full">
            <DatePicker
              className="w-full p-2 border border-gray-300 rounded text-sm"
              wrapperClassName="w-full" // Ensures the wrapper is full width
              selected={signUpParam.birthday ? new Date(signUpParam.birthday) : null}
              onChange={handleBirthdayChange}
              dateFormat="yyyy-MM-dd"
              locale={enUS}
              placeholderText="Birthday"
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
            />
          </div>

          {/* Address Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <input
              className="p-2 border border-gray-300 rounded text-sm"
              name="country"
              type="text"
              value={signUpParam.country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
            <input
              className="p-2 border border-gray-300 rounded text-sm"
              name="zipcode"
              type="text"
              value={signUpParam.zipcode}
              onChange={handleChange}
              placeholder="Zipcode"
              required
            />
            <input
              className="p-2 border border-gray-300 rounded text-sm"
              name="state"
              type="text"
              value={signUpParam.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <input
              className="p-2 border border-gray-300 rounded text-sm"
              name="city"
              type="text"
              value={signUpParam.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              className="col-span-2 p-2 border border-gray-300 rounded text-sm"
              name="street"
              type="text"
              value={signUpParam.street}
              onChange={handleChange}
              placeholder="Street"
              required
            />
          </div>

          {/* Password Inputs */}
          <input
            className="w-full p-2 border border-gray-300 rounded text-sm"
            name="password"
            type="password"
            value={signUpParam.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            className="w-full p-2 border border-gray-300 rounded text-sm"
            name="confirmPassword"
            type="password"
            value={signUpParam.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gray-700 text-white rounded text-sm hover:bg-gray-800"
            onClick={handleClickSignUp}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/member/login/" className="font-semibold underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
