// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getReservationItems, postChangeReservation } from "../api/reservationApi";


// export const getreservationItemsAsync = createAsyncThunk('getReservationItemsAsync', () => {
//     return getReservationItems()
// })

// export const postChangeReservationAsync = createAsyncThunk('postReservationItemsAsync', 
//     (param) => {
//     return postChangeReservation(param)
// })

// const initState = []

// const reservationSlice = createSlice ({
//     name: 'reservationSlice',
//     initialState: initState,

//     extraReducers: (builder) => {
//         builder
//         .addCase(
//             getreservationItemsAsync.fulfilled, (state,action) => {
//                 console.log("getReservationItemsAsync fulfilled")
//                 return action.payload
//             }
//         )
//         .addCase(
//             postChangeReservationAsync.fulfilled, (state, action) => {
//                 console.log("postReservationItemsAsync fulfilled")
//                 return action.payload
//             }
//         )
//     }
// })

// export default reservationSlice.reducer