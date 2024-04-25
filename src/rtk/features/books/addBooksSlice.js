import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BOOK_URL } from "../../../../constants";

const initialState = {
  isPending: false,
  isAdded: false,
  error: null,
};

const API = BOOK_URL;

export const addBook = createAsyncThunk("books/addBook", async (bookData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const addBookSlice = createSlice({
  name: "addBook",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addBook.pending, (state, action) => {
      state.isPending= true;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isAdded = true;
      state.isPending= false;
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.isAdded= false;
      state.isPending= false;
      state.error = action.error.message;
    });
  },
});

export default addBookSlice.reducer;
