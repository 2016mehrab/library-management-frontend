import { useState } from "react";
import { Helmet } from "react-helmet"; 

const loadingMessage = <p>Data is loading...</p>;
const Browse = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <Helmet>
        <title>Browse Books</title>
      </Helmet>
      <h1>Browse Books</h1>
      {isLoading && loadingMessage}
      <ul>
        Books:
        <li>book 1</li>
        <li>book 4</li>
        <li>book 3</li>
        <li>book 2</li>
      </ul>
    </div>
  );
};

export default Browse;
