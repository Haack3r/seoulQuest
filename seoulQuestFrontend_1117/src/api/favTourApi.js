import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/favTour`;

//예약 아이템 조회
export const getTourItems = async () => {
    console.log("GetTourItems 호출");
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email; // Ensure email is present

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
        throw error;
    }
};
// //예약 아이템 추가,수량변경
// export const postChangeTour = async (tourItem) => {
//   const res = await jwtAxios.post(`${host}/change`, tourItem);
//   return res.data;
// };
