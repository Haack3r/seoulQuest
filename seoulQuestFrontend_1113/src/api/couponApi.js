import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/mypage/coupon`;

export const getAvailableCoupons = async () => {
  const res = await jwtAxios.get(`${host}/available`);
  return res.data;
};

export const addCouponToMyList = async (email, couponId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  email = user?.email;

  try {
    await jwtAxios.post(`${host}/add`, null, {
      params: { email, couponId },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Redirecting to login.");
      // Redirect to login or handle token refresh if applicable
    } else {
      console.error("Error adding coupon:", error);
    }
  }
};

export const getMyCoupons = async (email) => {
  const res = await jwtAxios.get(`${host}/myCoupons`, {
    params: { email },
  });
  return res.data;
};
