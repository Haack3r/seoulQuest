import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./reviewApi";

const host = `${API_SERVER_HOST}/api/favoriteTour`;

// Get favorite tour items for the logged-in user
export const getFavTourItems = async (email) => {
    console.log("GetFavTourItems 호출");
    // const user = JSON.parse(localStorage.getItem("user")); 
    // const email = user.email; // Ensure email is present

    if (!email) {
        console.error("User is not logged in or email is missing.");
        throw new Error("User is not logged in.");
    }

    try {
        console.log("Fetching favorite tour items for:", email);
        const res = await jwtAxios.get(`${host}/items/${email}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching favorite tour items:", error);
        throw error;
    }
};

// Add or update a favorite tour item
export const postChangeFavTour = async (favTourItem) => {
    try {
        const res = await jwtAxios.post(`${host}/change`, favTourItem);
        return res.data;
    } catch (error) {
        console.error("Error adding/changing favorite tour:", error);
        return null; // Return null to prevent continuous re-renders or retries
    }
};

// Delete a single favorite tour item by ID
export const deleteFavTourItem = async (ftino) => {
    try {
        const res = await jwtAxios.delete(`${host}/item/${ftino}`);
        console.log("Delete API response:", res.data); // Confirm backend response
        return res.data;
    } catch (error) {
        console.error("Error deleting favorite tour item:", error);
        return null;
    }
};

// Bulk delete favorite tour items by IDs
export const deleteFavTourItemsBulk = async (ftinoList) => {
    console.log("Attempting bulk delete with ftinoList: ", ftinoList);
    try {
        // Retrieve the latest token from localStorage directly before making the request
        const token = localStorage.getItem("accessToken");

        const res = await jwtAxios.delete(`${host}/items/bulk-delete`, {
            data: ftinoList,
            headers: { Authorization: `Bearer ${token}` }
        });

        return res.data;
    } catch (error) {
        console.error("Error deleting favorite tour items in bulk:", error);
        return null; // Return null to prevent continuous retries
    }
};
