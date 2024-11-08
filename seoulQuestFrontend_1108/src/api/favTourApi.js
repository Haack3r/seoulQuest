import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/favTour`;

//예약 아이템 조회
export const getTourItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

//예약 아이템 추가,수량변경
export const postChangeTour = async (tourItem) => {
  const res = await jwtAxios.post(`${host}/change`, tourItem);
  return res.data;
};
