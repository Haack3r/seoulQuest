import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTourItems, postChangeTour } from "../api/favTourApi";

export const getTourItemsAsync = createAsyncThunk("getTourItemsAsync", () => {
  return getTourItems();
});

// export const postChangeTourAsync = createAsyncThunk(
//   "postTourtemsAsync",
//   (param) => {
//     return postChangeTour(param);
//   }
// );

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getTourItemsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTourItemsAsync.fulfilled, (state, action) => {
        console.log("getTourItemsAsync fulfilled");
        return action.payload;
      })
    // .addCase(postChangeTourAsync.fulfilled, (state, action) => {
    //   console.log("postTourItemsAsync fulfilled");
    //   return action.payload;
    // });
  },
});

export default tourSlice.reducer;
