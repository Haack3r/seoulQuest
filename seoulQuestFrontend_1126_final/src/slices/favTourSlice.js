import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFavTourItems, // tour-specific API call
  postChangeFavTour,
  deleteFavTourItem,
  deleteFavTourItemsBulk,
} from "../api/favTourApi";
import useCustomLogin from "../hooks/useCustomLogin";


export const getFavTourItemsAsync = createAsyncThunk(
    "favTour/getFavTourItems",
    async (email) => {
      const response = await getFavTourItems(email); // Pass email to the API
      return response;
    }
  );
  

export const postChangeTourFavAsync = createAsyncThunk(
  "favTour/postChangeFavTour",
  async (favItem) => {
    const response = await postChangeFavTour(favItem); // Adds tour to favorites
    return response;
  }
);

export const deleteTourFavItemAsync = createAsyncThunk(
  "favTour/deleteFavTourItem",
  async (ftino) => {
    const response = await deleteFavTourItem(ftino); // Deletes tour from favorites
    return response;
  }
);

export const deleteBulkTourFavItemAsync = createAsyncThunk(
  "favTour/deleteFavTourItemsBulk",
  async (ftinoList) => {
    const response = await deleteFavTourItemsBulk(ftinoList); // Bulk delete tours
    return response || [];
  }
);

const favTourSlice = createSlice({
  name: "favTour",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavTourItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload || []; // Ensure this sets tour items
      })
      .addCase(postChangeTourFavAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTourFavItemAsync.fulfilled, (state, action) => {
        const deletedFtino = action.meta.arg;
        state.items = state.items.filter(item => item.ftino !== deletedFtino);
      })
      .addCase(deleteBulkTourFavItemAsync.fulfilled, (state, action) => {
        const ftinoList = action.meta.arg;
        state.items = state.items.filter(item => !ftinoList.includes(item.ftino));
      });
  },
});

export default favTourSlice.reducer;
