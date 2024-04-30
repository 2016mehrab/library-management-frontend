import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookRequests } from '../rtk/features/bookrequests/fetchBookRequestSlice';
import { Helmet } from 'react-helmet';
import { Table, Dropdown, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

const StatusUpdateForm = ({ id, initialStatus }) => {
  const formik = useFormik({
    initialValues: {
      status: initialStatus,
    },
    onSubmit: (values, { setSubmitting }) => {
      axios.put(`http://127.0.0.1:8080/bookrequests/${id}/status`, {
        approveStatus: values.status,
      }).then(() => {
        setSubmitting(false);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dropdown onSelect={(selectedKey) => formik.setFieldValue("status", selectedKey)}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Status
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="PENDING">PENDING</Dropdown.Item>
          <Dropdown.Item eventKey="APPROVED">APPROVED</Dropdown.Item>
          <Dropdown.Item eventKey="REJECTED">REJECTED</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button type="submit">Submit</Button>
    </form>
  );
};

const UpdateRequest = () => {
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
            {/* <th>#</th> */}
            <th>Request ID</th>
            <th>ISBN</th>
            <th>Student ID</th>
            <th>Librarian ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookrequests.map((request, index) => (
            <tr key={index}>
              <td>{request.id}</td>
              <td>{request.isbn}</td>
              <td>{request.studentId}</td>
              <td>{request.librarianId}</td>
              <td>{request.status}</td>
              <td>
                <StatusUpdateForm id={request.id} initialStatus={request.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UpdateRequest;
