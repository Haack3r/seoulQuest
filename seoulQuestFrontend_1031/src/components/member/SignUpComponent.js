import React, { useState } from "react";
import Button from "../ui/Button";
import { registerMember, checkEmail } from "../../api/memberApi";

const initState = {
  //   firstname: "",
  //   lastname: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpComponent = () => {
  const [signUpParam, setSignUpParam] = useState({ ...initState });
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleChange = (e) => {
    setSignUpParam({ ...signUpParam, [e.target.name]: e.target.value });
  };

  const handleClickSignUp = async (e) => {
    e.preventDefault();
    if (signUpParam.password !== signUpParam.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await registerMember({
        name: signUpParam.name,
        email: signUpParam.email,
        password: signUpParam.password,
      });
      alert("Registration successful!");
      setSignUpParam({ ...initState });
      // Handle successful sign up here (e.g., redirect, show a message, etc.)
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Registration failed: " + error.message);
    }
  };

  const checkEmailAvailability = async () => {
    setIsCheckingEmail(true);
    try {
        const response = await checkEmail(signUpParam.email);
        setIsEmailAvailable(response.includes("가입가능")); // Check the actual message returned from the backend
        alert(response); // This shows the actual response message
    } catch (error) {
        console.error("Error checking email availability:", error);
        alert("Error checking email availability.");
        setIsEmailAvailable(false); // Default to unavailable on error
    } finally {
        setIsCheckingEmail(false);
    }
};



  //   const handleClickSignUp = async (e) => {
  //       e.preventDefault();

  //       .then((res) => {
  //         axios.post(
  //           "http://localhost:8080/api/member/signup",
  //           JSON.stringify({ email: "user1@gmail2.com", password: "1234" }),
  //           header
  //         );
  //       })
  //       .catch((res) => {
  //         console.log(res);
  //       });
  //   };

  return (
    <div className="min-h-screen flex mt-8">
      {/* Left half with video and overlay text */}
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

      {/* Right half with sign-up form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:bg-white bg-[#E0DCD0]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center text-xl font-bold text-gray-500">
            Sign Up
          </div>
          // Name Field
          <div className="relative flex w-full flex-wrap mb-4">
            <div className="w-full p-1 text-left font-bold">Name</div>
            <div className="flex w-full space-x-4">
              <input
                className="flex-1 p-3 rounded border border-solid border-neutral-500 shadow-md"
                name="name" // Change to "firstname"
                type="text"
                value={signUpParam.name}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              {/* <input
                className="flex-1 p-3 rounded border border-solid border-neutral-500 shadow-md"
                name="lastname" // Change to "lastname"
                type="text"
                value={signUpParam.lastname}
                onChange={handleChange}
                placeholder="Enter your last name"
              /> */}
            </div>
          </div>
          {/* Email Field */}
          <div className="relative flex w-full flex-wrap items-stretch mb-4">
            <div className="w-full p-1 text-left font-bold">Email</div>
            <div className="flex w-full space-x-4">
              <input
                className="w-full p-3 rounded border border-solid border-neutral-500 shadow-md"
                name="email"
                type="email"
                value={signUpParam.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <button
                onClick={checkEmailAvailability}
                disabled={isCheckingEmail}
                className="  rounded p-1 bg-gray-500  text-white text-xs"
              >
                {isCheckingEmail ? "Checking..." : "Check availability"}
              </button>
            </div>
          </div>
          {/* Password Field */}
          <div className="relative flex w-full flex-wrap items-stretch mb-4">
            <div className="w-full p-1 text-left font-bold">Password</div>
            <input
              className="w-full p-3 rounded border border-solid border-neutral-500 shadow-md"
              name="password"
              type="password"
              value={signUpParam.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          {/* Confirm Password Field */}
          <div className="relative flex w-full flex-wrap items-stretch mb-8">
            <div className="w-full p-1 text-left font-bold">
              Confirm Password
            </div>
            <input
              className="w-full p-3 rounded border border-solid border-neutral-500 shadow-md"
              name="confirmPassword"
              type="password"
              value={signUpParam.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>
          <Button
            className="rounded p-4 w-full bg-gray-500 text-xl text-white"
            onClick={handleClickSignUp}
            // disabled={
            //   !isEmailAvailable ||
            //   signUpParam.password !== signUpParam.confirmPassword
            // }
          >
            Sign Up
          </Button>
          <div className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Button className="p-0 h-auto font-semibold">Log In</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
