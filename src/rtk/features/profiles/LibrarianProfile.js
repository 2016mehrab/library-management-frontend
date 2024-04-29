
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_LIBRARIAN_PROFILE } from "../../../../constants"; // Assuming you have a constant for the student info URL

const initialState = {
  isPending: false,
  isAdded: false,
  error: null,
};

const API = ADD_LIBRARIAN_PROFILE;

export const addLibrarian = createAsyncThunk("librarian/addLibrarian", async (studentData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API, studentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const addLibrarianSlice = createSlice({
  name: "addLibrarian",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addLibrarian.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(addLibrarian.fulfilled, (state, action) => {
      state.isAdded = true;
      state.isPending = false;
    });
    builder.addCase(addLibrarian.rejected, (state, action) => {
      state.isAdded = false;
      state.isPending = false;
      state.error = action.error.message;
    });
  },
});

export default addLibrarianSlice.reducer;
