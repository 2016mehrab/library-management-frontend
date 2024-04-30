import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BOOK_REQUEST_URL, BOOK_URL } from "../../../../constants";

const initialState = {
  isPending: false,
  isAdded: false,
  error: null,
};

const API = BOOK_REQUEST_URL;

export const addBookRequest = createAsyncThunk("bookrequests/addBookRequest", async (bookData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const addBookRequestSlice = createSlice({
  name: "addBookRequest",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addBookRequest.pending, (state, action) => {
      state.isPending= true;
    });
    builder.addCase(addBookRequest.fulfilled, (state, action) => {
      state.isAdded = true;
      state.isPending= false;
    });
    builder.addCase(addBookRequest.rejected, (state, action) => {
      state.isAdded= false;
      state.isPending= false;
      state.error = action.error.message;
    });
  },
});

export default addBookRequestSlice.reducer;
