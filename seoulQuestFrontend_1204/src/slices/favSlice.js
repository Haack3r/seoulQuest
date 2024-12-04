import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavItems, postChangeFav, deleteFavItem, deleteFavItemsBulk } from "../api/favoriteApi";

export const getFavItemsAsync = createAsyncThunk(
  "fav/getFavItems",
  async (email) => {
    const response = await getFavItems(email);
    return response;
  }
);

export const postChangeFavAsync = createAsyncThunk("fav/postChangeFav", async (favItem) => {
  const response = await postChangeFav(favItem);
  return response;
});

export const deleteFavItemAsync = createAsyncThunk("fav/deleteFavItem", async (fino) => {
  const response = await deleteFavItem(fino);
  return response;
});

export const deleteBulkFavItemAsync = createAsyncThunk("fav/deleteBulkFavItem", async (finoList) => {
  const response = await deleteFavItemsBulk(finoList);
  return response || [];
});

const favSlice = createSlice({
  name: "fav",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(postChangeFavAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteFavItemAsync.fulfilled, (state, action) => {
        const deletedFino = action.meta.arg;
        state.items = state.items.filter((item) => item.fino !== deletedFino);
      })
      .addCase(deleteBulkFavItemAsync.fulfilled, (state, action) => {
        const finoList = action.meta.arg;
        state.items = state.items.filter((item) => !finoList.includes(item.fino));
      });
  },
});

export default favSlice.reducer;
