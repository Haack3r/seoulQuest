import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/user/tours`;

// Function to fetch the list of tours with pagination and search functionality
export const getList = async ({ page, size, keyword = "", type = "t" }) => {
  try {
    const res = await jwtAxios.get(`${host}/list`, {
      params: {
        page,
        size,
        keyword, // Search keyword
        type,    // Search type
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Add remaining tour API functions below

// Register a new tour
export const postAdd = async (tour) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/`, tour, header);
  return res.data;
};

// Retrieve a specific tour by ID
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${host}/${tno}`);
  return res.data;
};

// Update a specific tour
export const putOne = async (tno, tour) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${tno}`, tour, header);
  return res.data;
};

// Delete a specific tour
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${host}/${tno}`);
  return res.data;
};

// book : 유저의 booking정보를 서버로 보냄
export const postBookInfo = async (obj) => {
  console.log("obj:", obj);
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await jwtAxios.post(
      `${host}/orders`,
      {
        orderItems: obj.orderItems,
        usedCoupon: obj.usedCoupon,
        firstname: obj.firstname,
        lastname: obj.lastname,
        email: obj.email,
        phoneNumber: obj.phoneNumber,
        country: obj.country,
        totalPrice: obj.totalPrice,
        paymentMethod: obj.paymentMethod,
      },
      { headers }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to Post order info");
  }
};

// // payment: 유저의 결제 정보를 서버로 보냄 , impUid포함한 정보.
// export const postPayInfo = async (obj, impUid) => {
//   console.log("payment:", obj);
//   const {orderDTO} = obj
//   console.log(orderDTO)
//   console.log(impUid);
//   const headers = { "Content-Type": "application/json" };

//   try {
//     const res = await jwtAxios.post(
//       `${host}/payment/${impUid}`,
//         orderDTO,
//       //   paymentDate: new Date().toISOString(),
//       // ),
//       { headers }
//     );
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to Post payment info");
//   }
// };
