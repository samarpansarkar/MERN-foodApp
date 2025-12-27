import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = userSlice.actions;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
