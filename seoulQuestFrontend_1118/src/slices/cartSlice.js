import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";



export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const postChangeCartAsync = createAsyncThunk('postCartItemsAsync', 
    (param) => {
    return postChangeCart(param)
})

const initState = []

const cartSlice = createSlice ({
    name: 'cartSlice',
    initialState: initState,
    reducers: {
        // clearCart 액션 추가
        clearCart: () => {
            console.log("Cart cleared");
            return initState; // 카트를 초기 상태로 돌림
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getCartItemsAsync.fulfilled, (state,action) => {
                console.log("getCartItemsAsync fulfilled")

                return action.payload
            }
        )
        .addCase(
            postChangeCartAsync.fulfilled, (state, action) => {
                console.log("postCartItemsAsync fulfilled")

                return action.payload
            }
        )
    }
})

// clearCart 액션을 export
export const { clearCart } = cartSlice.actions;


export default cartSlice.reducer