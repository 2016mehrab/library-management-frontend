import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
// import ToastMessage from "../components/ToastMessage";
import { addBook } from "../rtk/features/books/addBooksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const AddBook = () => {
  const dispatch = useDispatch();

  const { error, isAdded } = useSelector((state) => state.addBook); // Redux state to check if book is being added
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      authors: [],
      categories: [], // categories is a string containing multiple categories
      isbn: "",
      quantity: 0,
      price: 0.0,
      coverLink: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(addBook(values));

        setShowToast(true);
        resetForm();
      } catch (error) {
        setShowToast(true);
        console.error(error);
      }
    },
  });

  return (
    <div>
      <Helmet>
        <title>Add Book</title>
      </Helmet>
      <h1>Add Book</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Title:</Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="authors">Authors:</Form.Label>
          <Form.Control
            type="text"
            id="authors"
            name="authors"
            value={formik.values.authors.join(", ")}
            onChange={(event) =>
              formik.setFieldValue("authors", event.target.value.split(", "))
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="categories">Categories:</Form.Label>
          <Form.Control
            type="text"
            id="categories"
            name="categories"
            value={formik.values.categories.join(", ")}
            onChange={(event) =>
              formik.setFieldValue("categories", event.target.value.split(", "))
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="isbn">ISBN:</Form.Label>
          <Form.Control
            type="text"
            id="isbn"
            name="isbn"
            value={formik.values.isbn}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="quantity">Quantity:</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="price">Price:</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="coverLink">Cover Link:</Form.Label>
          <Form.Control
            type="text"
            id="coverLink"
            name="coverLink"
            value={formik.values.coverLink}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {showToast && isAdded ? (
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => {
              setShowToast(false);
            }}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Status</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>Book added successfully!</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}

      {showToast && !isAdded ? (
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => {
              setShowToast(false);
            }}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Status</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>error</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </div>
  );
};

export default AddBook;
