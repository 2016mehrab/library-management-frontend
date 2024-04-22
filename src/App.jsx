import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import Book from "./pages/Book";
import RequestRecords from "./pages/RequestRecords";
import BorrowRecords from "./pages/BorrowRecords";
import Nonexistent from "./pages/Nonexistent";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/browse" element={<Browse />}></Route>
          <Route path="/book/:id" element={<Book />}></Route>
          <Route path="/bookrequests" element={<RequestRecords />}></Route>
          <Route path="/borrowrecords" element={<BorrowRecords />}></Route>
          <Route path="*" element={<Nonexistent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
