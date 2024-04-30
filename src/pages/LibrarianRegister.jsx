import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";

const LibrarianRegister = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      librarianId: ""
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <Helmet>
        <title>Librarian Register</title>
      </Helmet>
      <h1>Librarian</h1>
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
            type="text"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="librarianId">Librarian Id:</Form.Label>
          <Form.Control
            type="number"
            id="librarianId"
            name="librarianId"
            value={formik.values.librarianId}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LibrarianRegister;
