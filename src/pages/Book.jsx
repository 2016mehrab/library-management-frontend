import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Book = () => {
  const { id } = useParams();
  // const [bookData, setBookData] = useState("")
  useEffect(() => {
    // books will come from api
    // const bookArr= books.filter ((book)=> book.id===id);
    // setBookData(bookArr[0]);
  }, [])
  
  return (
    <div>
      <Helmet>
        <title>Book title</title>
      </Helmet>
      <h1>Book {id}</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  );
};

export default Book;
