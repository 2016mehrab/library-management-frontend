import { default as booksReducer } from "../features/books/booksSlice";
import { default as librariansReducer } from "../features/librarian/librariansSlice";
import authReducer from "../features/auth/authSlice";
import addBookReducer from "../features/books/addBooksSlice";
import addBookRequestReducer from "../features/bookrequests/bookRequestSlice";
import addStudentProfileReducer from "../features/profiles/StudentProfile";
import addLibrarianProfileReducer from "../features/profiles/LibrarianProfile";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    librarians: librariansReducer,
    addBook: addBookReducer,
    auth: authReducer,
    studentProfile: addStudentProfileReducer,
    librarianProfile: addLibrarianProfileReducer,
    addBookRequest: addBookRequestReducer,
  },
});
