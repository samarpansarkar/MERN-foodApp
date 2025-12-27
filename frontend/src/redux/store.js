import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import foodReducer from "./slices/foodSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    food: foodReducer,
  },
});

export default store;
