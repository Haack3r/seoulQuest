import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginSlice); // 로그인 상태
  const isLogin = loginState.email ? true : false; // 로그인 여부
  const doLogin = async (loginParam) => {
    // 로그인 함수
    const action = await dispatch(loginPostAsync(loginParam));
    return action.payload;
  };
  const doLogout = () => {
    // 로그아웃 함수
    dispatch(logout());
  };
  const moveToPath = (path) => {
    // 페이지 이동
    navigate({ pathname: path }, { replace: true });
  };
  const moveToLogin = () => {
    // 로그인 페이지 이동
    navigate({ pathname: "member/login" }, { replace: true });
  };
  const moveToLoginReturn = () => {
    // 로그인 페이지 이동 컴포넌트
    return <Navigate replace to="/member/login" />;
  };
  // p396 토큰 예외처리
  const exceptionHandle = (ex) => {
    console.log("exception-------");
    console.log(ex);
    const errorMsg = ex.response.data.error;
    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("You Must Login");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }

    if (ex.response.data.error === "ERROR_ACCESS_DENIED") {
      alert("No permission");
      navigate({ pathname: "/member/login", search: errorStr });
      return;
    }
  };
  return {
    navigate,
    dispatch,
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
  };
};
export default useCustomLogin;
