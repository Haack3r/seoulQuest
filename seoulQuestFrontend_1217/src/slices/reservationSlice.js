import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReservationItems, postChangeReservation } from "../api/reservationApi";


export const getReservationItemsAsync = createAsyncThunk('getReservationItemsAsync', () => {
    return getReservationItems()
})

export const postChangeReservationAsync = createAsyncThunk('postReservationItemsAsync', 
    (param) => {
    return postChangeReservation(param)
})

const initState = []

const reservationSlice = createSlice ({
    name: 'reservationSlice',
    initialState: initState,
    reducers: {
        // clearReservation 액션 추가
        clearReservation: () => {
            console.log("Reservation cleared");
            return initState; 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            getReservationItemsAsync.fulfilled, (state,action) => {
                console.log("getReservationItemsAsync fulfilled")
                return action.payload
            }
        )
        .addCase(
            postChangeReservationAsync.fulfilled, (state, action) => {
                console.log("postReservationItemsAsync fulfilled")
                return action.payload
            }
        )
    }
})


// clearCart 액션을 export
export const { clearReservation } = reservationSlice.actions;
export default reservationSlice.reducer