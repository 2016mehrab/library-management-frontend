import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {fetchbBooks} from "../rtk/features/books/booksSlice";

const loadingMessage = <p>Data is loading...</p>;
const errorMessage = <p>There was an error...</p>;

const Browse = () => {
  const { isLoading, books, error } = useSelector((state) => {
    // console.log(state);
    return state.books;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchbBooks());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Browse Books</title>
      </Helmet>
      <h1>Browse Books</h1>
      {isLoading && loadingMessage}
      {error && errorMessage}
      <Row>
        {books.map((book) => (
          <Col sm={4} key={book.isbn}>
            <Link to={`/book/${book.isbn}`}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={book.coverLink} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    ISBN: {book.isbn}
                    <br />
                    Price: {book.price}
                    <br />
                    Quantity: {book.quantity}
                    <br />
                    Categories: {book.categories.join(", ")}
                    <br />
                    Authors: {book.authors.join(", ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Browse;
