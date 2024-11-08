import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavItems, postChangeFav } from "../api/favoriteApi";



export const getFavItemsAsync = createAsyncThunk('getFavItemsAsync', () => {
    return getFavItems()
})

export const postChangeFavAsync = createAsyncThunk('postFavItemsAsync', 
    (param) => {
    return postChangeFav(param)
})

const initState = []

const favSlice = createSlice ({
    name: 'favSlice',
    initialState: initState,
    extraReducers: (builder) => {
        builder.addCase(
            getFavItemsAsync.fulfilled, (state,action) => {
                console.log("getFavItemsAsync fulfilled")

                return action.payload
            }
        )
        .addCase(
            postChangeFavAsync.fulfilled, (state, action) => {
                console.log("postFavItemsAsync fulfilled")

                return action.payload
            }
        )
    }
})

export default favSlice.reducer