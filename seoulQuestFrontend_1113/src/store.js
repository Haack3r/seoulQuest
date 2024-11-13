import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";
import reservationSlice from "./slices/reservationSlice"
import favSlice from "./slices/favSlice"
import favTourSlice from "./slices/favTourSlice";

export default configureStore({
    reducer: {
        "loginSlice": loginSlice,
        "cartSlice": cartSlice,
        "reservationSlice": reservationSlice,
        "fav": favSlice,
        "favTour": favTourSlice
    }
})