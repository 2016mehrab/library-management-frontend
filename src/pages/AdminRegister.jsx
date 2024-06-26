import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../rtk/features/auth/authSlice";
import axios from "axios";
import { ADMIN_REG_URL } from "../../constants";
import { useState } from "react";

const AdminRegister = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    
    onSubmit: async (values) => {
      try {
        const response = await axios.post(ADMIN_REG_URL, values);

        if (response.status !== 403) {
          const token = response.data.token;

          localStorage.setItem("token", token);
          dispatch(setToken(token));
          setShowToast(true);
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setShowToast(true);
      }
    },
  });
  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h1>Admin</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {showToast && isAuthenticated ? (
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
              <strong className="me-auto">Status</strong>
            </Toast.Header>
            <Toast.Body>Registered Successfully!</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}

      {showToast && !isAuthenticated ? (
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
              <strong className="me-auto">Status</strong>
            </Toast.Header>
            <Toast.Body>Failed to register!</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </div>
  );
};

export default AdminRegister;
