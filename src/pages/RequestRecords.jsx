import { Helmet } from "react-helmet";
const RequestRecords = () => {
  return (
    <div>
      <Helmet>
        <title>Requested Books</title>
      </Helmet>
        <h1>Requested Books</h1>
        <ul>
            <li>Book 2</li>
            <li>Book 8</li>
        </ul>
    </div>
  )
}

export default RequestRecords