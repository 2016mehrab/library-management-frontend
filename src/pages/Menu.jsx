import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearToken } from "../rtk/features/auth/authSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token key from local storage
    localStorage.removeItem("token");
    // Dispatch the clearToken action
    dispatch(clearToken());
    // Redirect to the login page or any other appropriate page after logout
    navigate("/alogin"); // Replace "/login" with the appropriate logout destination
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" activeClassName="active" to="/llogin">
              LLogin
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/lregister"
            >
              LRegister
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/aregister"
            >
            Admin Register
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/alogin"
            >
            Admin login
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/browse">
              Browse Books
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/bookrequests"
            >
              Requested Books
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/borrowrecords"
            >
              Borrow Records
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/add-student-profile"
            >
              Add Student
            </NavLink>

            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/add-librarian-profile"
            >
              Add Librarian
            </NavLink>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
