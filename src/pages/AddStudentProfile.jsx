import { useFormik } from "formik";
import  { useState } from "react";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../rtk/features/profiles/StudentProfile";

const AddStudentProfile = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showToast, setShowToast] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      id: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const studentData = {
          name: values.name,
          email: values.email,
          id: values.id,
          admin: {
            id: 1,
          },
        };

        await dispatch(addStudent(studentData));
        setShowToast(true);
        resetForm();
      } catch (error) {
        setShowToast(true);
        resetForm();
      }
    },
  });

  return (
    <div>
      <Helmet>
        <title>Add Student Profile</title>
      </Helmet>
      <h1>Add Student Profile</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="id">Id:</Form.Label>
          <Form.Control
            type="number"
            id="id"
            name="id"
            value={formik.values.id}
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
            <Toast.Body>Added successfully!</Toast.Body>
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
            <Toast.Body>Failed to Add!</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </div>
  );
};

export default AddStudentProfile;
