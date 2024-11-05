import axios from "axios";
import jwtAxios from "../util/jwtUtil";
// import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/map`;

export const getMapByCategory = async (category) => {
  console.log("category:", category);
  try {
    // Retrieve the token from localStorage
    const accessToken = localStorage.getItem("jwtToken");
    console.log("Token: ", accessToken);

    if (!accessToken) {
      throw new Error("JWT token not found. Please log in again.");
    }

    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Cache-Control": "no-cache",
      },
    };

    // Use jwtAxios for consistent JWT handling
    const res = await jwtAxios.get(`${host}/items/list/${category}`, header);
    console.log("res:", res);
    return res.data;
  } catch (error) {
    console.error("Error fetching data by category:", error);
    if (error.response && error.response.status === 401) {
      alert("Unauthorized. Please log in again.");
    }
    throw error;
  }
};
