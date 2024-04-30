import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookRequests} from '../rtk/features/bookrequests/fetchBookRequestSlice';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';

const RequestRecords = () => {
  const dispatch = useDispatch();
  const bookrequests = useSelector(state => state.fetchBookRequest.bookrequests);

  useEffect(() => {
    dispatch(fetchBookRequests());
  }, [dispatch]);

  return (
        <div>
      <Helmet>
        <title>Requested Books</title>
      </Helmet>
      <h1>Requested Books</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ISBN</th>
            <th>Student ID</th>
            <th>Librarian ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookrequests.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.isbn}</td>
              <td>{request.studentId}</td>
              <td>{request.librarianId}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RequestRecords;