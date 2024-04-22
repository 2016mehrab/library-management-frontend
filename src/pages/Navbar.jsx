import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/browse">Browse Books</NavLink>
      <NavLink to="/bookrequests">Requested Books</NavLink>
      <NavLink to="/borrowrecords">Borrow Records</NavLink>
    </div>
  );
};

export default Navbar;
