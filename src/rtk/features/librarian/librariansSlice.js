import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  librarians: [],
  error: null,
};
const API = "http://localhost:8080/librarians";

export const fetchLibrarians = createAsyncThunk("librarians/fetchLibrarians", async () => {
  const token = localStorage.getItem('token'); 
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`, // use the token from cookies
    },
  });
  const librarians = res.data;
  return librarians;
});

const librariansSlice = createSlice({
  name: "librarians",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLibrarians.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLibrarians.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.librarians = action.payload;
    });
    builder.addCase(fetchLibrarians.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.librarians = [];
    });
  },
});

export default librariansSlice.reducer;