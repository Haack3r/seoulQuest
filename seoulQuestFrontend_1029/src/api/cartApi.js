// import jwtAxios from "../util/jwtUtil";
import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async () => {
  const res = await axios.get(`${host}/items`);
  return res.data;
};

export const postChangeCart = async (cartItem) => {
  const res = await axios.post(`${host}/change`, cartItem);
  return res.data;
};
