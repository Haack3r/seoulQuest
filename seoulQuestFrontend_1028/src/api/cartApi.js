import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/cart`;

// //카트 아이템 조회
// export const getCartItems = async () => {
//   const res = await jwtAxios.get(`${host}/items`);
//   return res.data;
// };

//카트 아이템 추가,수량변경
export const postChangeCart = async (cartItem) => {
  const res = await jwtAxios.post(`${host}/change`, cartItem);
  return res.data;
};
