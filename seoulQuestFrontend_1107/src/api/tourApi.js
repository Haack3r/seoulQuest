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
