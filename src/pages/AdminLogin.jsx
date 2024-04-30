import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setToken} from "../rtk/features/auth/authSlice";
import axios from "axios";
import { ADMIN_AUTH_URL } from "../../constants";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(ADMIN_AUTH_URL, values);

        if (response.status !== 403) {
          const token = response.data.token;
          console.log(token);

          localStorage.setItem("token", token);
          dispatch(setToken(token));
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  });

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>Login</h1>
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
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
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

export default AdminLogin;
