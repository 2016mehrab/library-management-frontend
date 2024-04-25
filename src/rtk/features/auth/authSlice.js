import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
export const { setToken, clearToken } = authSlice.actions;
