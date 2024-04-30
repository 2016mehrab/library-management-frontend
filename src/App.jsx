import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import Book from "./pages/Book";
import RequestRecords from "./pages/RequestRecords";
import BorrowRecords from "./pages/BorrowRecords";
import Nonexistent from "./pages/Nonexistent";
import Menu from "./pages/Menu";
import LibrarianLogin from "./pages/LibrarianLogin";
import LibrarianRegister from  "./pages/LibrarianRegister";
import AddBook from "./pages/AddBook";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AddStudentProfile from "./pages/AddStudentProfile";
import AddLibrarianProfile from "./pages/AddLibrarianProfile";
import StudentRegister from "./pages/StudentRegister";
import StudentLogin from "./pages/StudentLogin";
import UpdateRequest from "./pages/UpdateRequest";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/llogin" element={<LibrarianLogin />}></Route>
          <Route path="/lregister" element={<LibrarianRegister/>}></Route>
          <Route path="/sregister" element={<StudentRegister/>}></Route>
          <Route path="/slogin" element={<StudentLogin />}></Route>
          <Route path="/aregister" element={<AdminRegister/>}></Route>
          <Route path="/alogin" element={<AdminLogin />}></Route>
          <Route path="/add-student-profile" element={<AddStudentProfile />}></Route>
          <Route path="/add-librarian-profile" element={<AddLibrarianProfile />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/browse" element={<Browse />}></Route>
          <Route path="/book/:isbn" element={<Book />}></Route>
          <Route path="/addbook" element={<AddBook />}></Route>
          <Route path="/updaterequests" element={<UpdateRequest />}></Route>
          <Route path="/bookrequests" element={<RequestRecords />}></Route>
          <Route path="/borrowrecords" element={<BorrowRecords />}></Route>
          <Route path="*" element={<Nonexistent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
