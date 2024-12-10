import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./reviewApi";

const host = `${API_SERVER_HOST}/api/reservation`;

//예약 아이템 조회
export const getReservationItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

//예약 아이템 추가,수량변경
export const postChangeReservation = async (reservationItem) => {
  const res = await jwtAxios.post(`${host}/change`, reservationItem);
  return res.data;
};
