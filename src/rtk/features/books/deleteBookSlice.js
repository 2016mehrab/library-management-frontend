import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BOOK_URL } from "../../../../constants";

const initialState = {
  isPending: false,
  isDeleted: false,
  error: null,
};

const API = BOOK_URL;

export const deleteBook = createAsyncThunk("books/deleteBook", async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API}/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const deleteBookSlice = createSlice({
  name: "deleteBook",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteBook.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isDeleted = true;
      state.isPending = false;
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isDeleted = false;
      state.isPending = false;
      state.error = action.error.message;
    });
  },
});

export default deleteBookSlice.reducer;
