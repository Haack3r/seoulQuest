import React, { useState } from "react";
// import { useDispatch } from 'react-redux'
// import { login, loginPostAsync } from '../../slices/loginSlice'
// import { replace, useNavigate } from 'react-router-dom'
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
  email: "",
  pw: "",
};
const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
<<<<<<< HEAD
  const { doLogin, moveToPath } = useCustomLogin();
=======
  // const { doLogin, moveToPath } = useCustomLogin();
>>>>>>> origin/hyein
  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    // dispatch(login(loginParam)) // 작동 확인 용
    // console.log('info : '+loginParam.email +'/'+loginParam.pw) // email/pw 확인 용

    // dispatch(loginPostAsync(loginParam)) // loginSlice 비동기 호출
    // .unwrap()
<<<<<<< HEAD
    doLogin(loginParam) // hook 사용
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("Check your Email or Password");
        } else {
          alert("Success");
          // 홈화면 이동 후 뒤로가기 하면 로그인화면 표시 X
          // navigate({ pathname: '/' }, { replace: true })
          moveToPath("/"); // hook 사용
        }
      });
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          Login Component
=======
    // doLogin(loginParam) // hook 사용
    //   .then((data) => {
    //     console.log(data);
    //     if (data.error) {
    //       alert("Check your Email or Password");
    //     } else {
    //       alert("Success");
    //       // 홈화면 이동 후 뒤로가기 하면 로그인화면 표시 X
    //       // navigate({ pathname: '/' }, { replace: true })
    //       moveToPath("/"); // hook 사용
    //     }
    //   });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-orange-500">
          Login
>>>>>>> origin/hyein
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type={"text"}
            value={loginParam.email}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Password</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type={"password"}
            value={loginParam.pw}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
<<<<<<< HEAD
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
=======
              className="rounded p-4 w-36 bg-orange-500 text-xl text-white"
>>>>>>> origin/hyein
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <KakaoLoginComponent />
=======
      {/* <KakaoLoginComponent /> */}
>>>>>>> origin/hyein
    </div>
  );
};

export default LoginComponent;
