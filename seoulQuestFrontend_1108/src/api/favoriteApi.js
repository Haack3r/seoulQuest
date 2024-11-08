import jwtAxios from "../util/jwtUtil";
// import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/favorite`;

export const getFavItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

export const postChangeFav = async (cartItem) => {
  const res = await jwtAxios.post(`${host}/change`, cartItem);
  return res.data;
};
