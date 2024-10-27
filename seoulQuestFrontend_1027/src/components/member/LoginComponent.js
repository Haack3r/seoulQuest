import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login, loginPostAsync } from "../../slices/loginSlice";
// import { replace, useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import Button from "../ui/Button";

const initState = {
  email: "",
  password: "",
};
const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin, moveToPath } = useCustomLogin();
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    // dispatch(login(loginParam)); // 작동 확인 용
    // console.log("info : " + loginParam.email + "/" + loginParam.password); // email/pw 확인 용

    // dispatch(loginPostAsync(loginParam)) // loginSlice 비동기 호출
    //   .unwrap();
    doLogin(loginParam) // hook 사용
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("Check your Email or Password");
        } else {
          alert("Success");
          const userRole = data.roleName; // Assuming data contains a `role` field
          console.log(userRole);
          localStorage.setItem(
            "user",
            JSON.stringify({ email: loginParam.email, role: userRole })
          );
          console.log(localStorage.getItem("user"));
          // 홈화면 이동 후 뒤로가기 하면 로그인화면 표시 X
          //   navigate({ pathname: "/" }, { replace: true });
          moveToPath("/"); // hook 사용
        }
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-orange-500">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">Email</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="email"
              type={"text"}
              value={loginParam.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">Password</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="password"
              type={"password"}
              value={loginParam.password}
              onChange={handleChange}
              placeholder="Enter your password"
            ></input>
          </div>

          <Button
            className="rounded p-4 w-full bg-orange-500 text-xl text-white"
            onClick={handleClickLogin}
          >
            Log In
          </Button>

          {/* <KakaoLoginComponent />  */}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Button className="text-sm text-muted-foreground">
            Find Password
          </Button>
          <div className="text-sm text-muted-foreground">
            Not a user?{" "}
            <Button className="p-0 h-auto font-semibold">Sign Up</Button>
          </div>
        </CardFooter>
      </Card>

      {/* -------------------------변경 전------------------------------------ */}
      {/* 

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
              className="rounded p-4 w-36 bg-orange-500 text-xl text-white"
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <KakaoLoginComponent /> 
      */}
    </div>
  );
};

export default LoginComponent;
