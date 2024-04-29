import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_STUDENT_PROFILE } from "../../../../constants"; // Assuming you have a constant for the student info URL

const initialState = {
  isPending: false,
  isAdded: false,
  error: null,
};

const API = ADD_STUDENT_PROFILE;

export const addStudent = createAsyncThunk("students/addStudent", async (studentData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API, studentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const addStudentSlice = createSlice({
  name: "addStudent",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addStudent.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.isAdded = true;
      state.isPending = false;
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.isAdded = false;
      state.isPending = false;
      state.error = action.error.message;
    });
  },
});

export default addStudentSlice.reducer;
