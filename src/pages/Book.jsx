import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";

const loadingMessage = <p>Data is loading...</p>;
const errorMessage = <p>There was an error...</p>;

const Book = () => {
  const { isbn } = useParams();
  // const [bookData, setBookData] = useState("")
  // const { books } = useSelector((state) => state.booksReducer.books);

  const { isLoading, books, error } = useSelector((state) => {
    // console.log(state);
    return state.books;
  });

  const book = books.find((book) => book.isbn === isbn);

  return (
    <Container>
      <Helmet>
        <title>{book.title}</title>
      </Helmet>
      {isLoading && loadingMessage}
      {error && errorMessage}
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
    </Container>
  );
};

export default Book;
