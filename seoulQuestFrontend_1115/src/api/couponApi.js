import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/mypage/coupon`;

export const getAvailableCoupons = async () => {
  try {
    const res = await jwtAxios.get(`${host}/available`);
    return res.data;
  } catch (error) {
    console.error("Error fetching available coupons:", error);
    throw error;
  }
};

export const addCouponToMyList = async (couponId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user.email;

    if (!email) {
      throw new Error("User email not found in localStorage");
    }

    await jwtAxios.post(`${host}/add/${email}`, null, {
      params: { couponId },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Redirecting to login.");
      // Redirect to login or handle token refresh if applicable
    } else {
      console.error("Error adding coupon:", error);
    }
    throw error; // Rethrow to handle it in the UI if necessary
  }
};

export const getMyCoupons = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;
  
      if (!email) {
        throw new Error("User email not found in localStorage");
      }
  
      const res = await jwtAxios.get(`${host}/myCoupons`, {
        params: { email },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching my coupons:", error);
      throw error;
    }
  };
  