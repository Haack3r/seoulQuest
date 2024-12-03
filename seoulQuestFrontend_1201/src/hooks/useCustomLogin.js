import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil"; // Correct import for removeCookie
import { clearCart } from "../slices/cartSlice";
import { clearReservation } from "../slices/reservationSlice";

const useCustomLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.loginSlice);
    const isLogin = !!loginState.email;
  
    const doLogin = async (loginParam) => {
        dispatch(clearCart()); // 새로운 로그인 시 clearCart 호출
      dispatch(clearReservation())
      const action = await dispatch(loginPostAsync(loginParam));
      return action.payload;
    };
  
    const doLogout = () => { 
        dispatch(logout());
        dispatch(clearCart()); // 새로운 로그인 시 clearCart 호출
        dispatch(clearReservation())
        removeCookie("member"); // Correctly imported and used
      };
  
    const moveToPath = (path) => {
      navigate({ pathname: path }, { replace: true });
    };
  
    const moveToLogin = () => {
      navigate({ pathname: "/member/login" }, { replace: true });
    };
  
    const moveToLoginReturn = () => <Navigate replace to="/member/login" />;
  
    const exceptionHandle = (ex) => {
      const errorMsg = ex?.response?.data?.error || "UNKNOWN_ERROR";
      const errorStr = createSearchParams({ error: errorMsg }).toString();
  
      if (errorMsg === "REQUIRE_LOGIN") {
        alert("You Must Login");
        navigate({ pathname: "/member/login", search: errorStr });
      } else if (errorMsg === "ERROR_ACCESS_DENIED") {
        alert("No permission");
        navigate({ pathname: "/member/login", search: errorStr });
      } else {
        console.error("Unhandled error:", errorMsg);
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
  