import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../rtk/features/auth/authSlice";
import axios from "axios";
import {  STUDENT_AUTH_URL } from "../../constants";
import { useState } from "react";

const StudentLogin = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(STUDENT_AUTH_URL, values);

        if (response.status !== 403) {
          const token = response.data.token;

          localStorage.setItem("token", token);
          dispatch(setToken(token));
          setShowToast(true);
          resetForm();

        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setShowToast(true);
        resetForm();
      }
    },
  });

  return (
    <div>
      <Helmet>
        <title>Student Login</title>
      </Helmet>
      <h1>Student Login</h1>
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
              <strong className="me-auto">Status</strong>
            </Toast.Header>
            <Toast.Body>Logged In!</Toast.Body>
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
              <strong className="me-auto">Status</strong>
            </Toast.Header>
            <Toast.Body>Failed to login!</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </div>
  );
};

export default StudentLogin ;
