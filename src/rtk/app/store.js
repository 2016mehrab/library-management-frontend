import { default as booksReducer } from "../features/books/booksSlice";
import authReducer from "../features/auth/authSlice";
import addBookReducer from "../features/books/addBooksSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    addBook: addBookReducer,
    auth: authReducer,
  },
});
