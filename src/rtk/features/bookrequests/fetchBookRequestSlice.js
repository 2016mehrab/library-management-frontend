import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  bookrequests: [],
  error: null,
};
const API = "http://localhost:8080/bookrequests";

export const fetchBookRequests= createAsyncThunk("bookrequests/fetchBookRequests", async () => {
  const token = localStorage.getItem('token'); 
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`, // use the token from cookies
    },
  });
  const bookrequests = res.data;
  return bookrequests;
});

const fetchBookRequestSlice = createSlice({
  name: "fetchbookrequests",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBookRequests.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBookRequests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.bookrequests = action.payload;
    });
    builder.addCase(fetchBookRequests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.bookrequests = [];
    });
  },
});

export default fetchBookRequestSlice.reducer;