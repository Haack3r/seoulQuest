import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";
import reservationSlice from "./slices/reservationSlice"

export default configureStore({
    reducer: {
        "loginSlice": loginSlice,
        "cartSlice": cartSlice,
        "reservationSlice" : reservationSlice
    }
})