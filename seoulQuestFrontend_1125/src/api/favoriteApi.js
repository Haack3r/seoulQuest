import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./reviewApi";

const host = `${API_SERVER_HOST}/api/favorite`;

// Fetch favorite items with error handling
export const getFavItems = async (email) => {
  console.log("GetTourItems 호출");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const email = user?.email;

  if (!email) {
    console.error("User is not logged in or email is missing.");
    throw new Error("User is not logged in.");
  }

  try {
    console.log("Fetching favorite items for:", email);
    const res = await jwtAxios.get(`${host}/items/${email}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return null; // Return null or some fallback data to prevent infinite loading
  }
};

// Add or change a favorite item
export const postChangeFav = async (favItem) => {
  try {
    const res = await jwtAxios.post(`${host}/change`, favItem);
    return res.data;
  } catch (error) {
    console.error("Error adding/changing favorite item:", error);
    return null; // Return null to prevent continuous re-renders or retries
  }
};

// Delete a single favorite item by ID
export const deleteFavItem = async (fino) => {
    try {
      const res = await jwtAxios.delete(`${host}/item/${fino}`);
      console.log("Delete API response:", res.data); // Confirm backend response
      return res.data;
    } catch (error) {
      console.error("Error deleting favorite item:", error);
      return null;
    }
  };
  

// favoriteApi.js

// Bulk delete favorite items by IDs
export const deleteFavItemsBulk = async (finoList) => {
    console.log("Attempting bulk delete with finoList: ", finoList);
    try {
        // Retrieve the latest token from localStorage directly before making the request
        const token = localStorage.getItem("accessToken");
        
        const res = await jwtAxios.delete(`${host}/items/bulk-delete`, {
            data: finoList,
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return res.data;
    } catch (error) {
        console.error("Error deleting favorite items in bulk:", error);
        return null; // Return null to prevent continuous retries
    }
};

