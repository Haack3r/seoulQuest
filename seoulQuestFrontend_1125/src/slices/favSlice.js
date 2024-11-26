import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFavItems,
  postChangeFav,
  deleteFavItem,
  deleteFavItemsBulk,
} from "../api/favoriteApi";
import useCustomLogin from "../hooks/useCustomLogin";
// Define the existing async thunks
export const getFavItemsAsync = createAsyncThunk(
  "fav/getFavItems",
    async () => {
        const { loginState } = useCustomLogin();
    const response = await getFavItems(loginState.email);
    return response; // This should be the data from the API
  }
);

export const postChangeFavAsync = createAsyncThunk(
  "fav/postChangeFav",
  async (favItem) => {
    const response = await postChangeFav(favItem);
    return response;
  }
);

// Define the missing deleteFavItemAsync thunk
export const deleteFavItemAsync = createAsyncThunk(
  "fav/deleteFavItem",
  async (fino) => {
    const response = await deleteFavItem(fino);
    return response;
  }
);
export const deleteBulkFavItemAsync = createAsyncThunk('fav/deleteBulkFavItem', async (finoList) => {
    const response = await deleteFavItemsBulk(finoList);
    console.log("Bulk delete response:", response); // Log response to confirm deletion
    return response || [];
});


// Create the slice
const favSlice = createSlice({
  name: "fav",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getFavItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(getFavItemsAsync.rejected, (state, action) => {
        state.error = action.payload || "An error occurred"; // Store error message
      })
      .addCase(postChangeFavAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteFavItemAsync.fulfilled, (state, action) => {
        const deletedFino = action.meta.arg;
        state.items = state.items.filter(item => item.fino !== deletedFino);
      })
      .addCase(deleteBulkFavItemAsync.fulfilled, (state, action) => {
        const finoList = action.meta.arg; // Get list of deleted items
        state.items = state.items.filter(item => !finoList.includes(item.fino)); // Filter out deleted items
    });
  },
});

export default favSlice.reducer;
