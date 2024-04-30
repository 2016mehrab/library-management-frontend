import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Image,
  Dropdown,
  Form,
  Toast,
  ToastContainer,
  Button,
} from "react-bootstrap";
import { fetchLibrarians } from "../rtk/features/librarian/librariansSlice";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addBookRequest } from "../rtk/features/bookrequests/bookRequestSlice";

const loadingMessage = <p>Data is loading...</p>;
const errorMessage = <p>There was an error...</p>;

const Book = () => {
  const { isbn } = useParams();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const { isAdded } = useSelector((state) => state.addBookRequest);

  const formik = useFormik({
    initialValues: {
      studentId: "",
      librarianId: "",
      isbn: isbn,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("FORM DATA", values);
        await dispatch(addBookRequest(values));
        setShowToast(true);
        resetForm();
      } catch (error) {
        console.error("Error:", error.message);
        setShowToast(true);
        resetForm();
      }
    },
  });

  const {
    isLoading: librariansLoading,
    error: librariansError,
    librarians,
  } = useSelector((state) => state.librarians);

  const {
    isLoading: booksLoading,
    books,
    error: booksError,
  } = useSelector((state) => {
    return state.books;
  });

  const book = books.find((book) => book.isbn === isbn);

  useEffect(() => {
    dispatch(fetchLibrarians());
  }, [dispatch]);

  return (
    <Container>
      <Helmet>
        <title>{book.title}</title>
      </Helmet>
      {(librariansLoading || booksLoading) && loadingMessage}
      {(librariansError || booksError) && errorMessage}
      <Row>
        <Col xs={12} md={4}>
          <Image src={book.coverLink} alt={book.title} thumbnail />
        </Col>
        <Col xs={12} md={8}>
          <h1>{book.title}</h1>
          <p>
            ISBN: {book.isbn}
            <br />
            Price: {book.price}
            <br />
            Quantity: {book.quantity}
            <br />
            Categories: {book.categories.join(", ")}
            <br />
            Authors: {book.authors.join(", ")}
          </p>
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit}>
        <Dropdown
          onSelect={(selectedKey) =>
            formik.setFieldValue("librarianId", parseInt(selectedKey, 10))
          }
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Librarian
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {librarians.map((librarian) => (
              <Dropdown.Item
                key={librarian.id}
                eventKey={librarian.id.toString()}
              >
                {librarian.id}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="studentId">Your Id:</Form.Label>
          <Form.Control
            type="number"
            id="studentId"
            name="studentId"
            value={formik.values.studentId}
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
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Status</strong>
            </Toast.Header>
            <Toast.Body>Request Added!</Toast.Body>
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
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Status</strong>
            </Toast.Header>
            <Toast.Body>Failed!</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </Container>
  );
};

export default Book;
