import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  books: [],
  error: null,
};
const API = "http://localhost:8080/books";

export const fetchbBooks = createAsyncThunk("books/fetchBooks", async () => {
  const token = localStorage.getItem('token'); 
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`, // use the token from cookies
    },
  });
  const books = res.data;
  return books;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchbBooks.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchbBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.books = action.payload;
    });
    builder.addCase(fetchbBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.books = [];
    });
  },
});

export default booksSlice.reducer;