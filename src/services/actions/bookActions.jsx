import axios from "axios";
import {
  GET_BOOKS_FAILED,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
} from "../constants/bookConstants";
const API = "http://localhost:8080/books";
export const getAllBooks = () => async (dispatch) => {
  dispatch({
    type: GET_BOOKS_REQUEST,
  });
  try {
    const res = await axios.get(API, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJBX21laHJhYiIsImlhdCI6MTcxMzg0NTc4MCwiZXhwIjoxNzEzODQ3MjIwfQ.-EemXXhz7XEaQNrn5JXY0yqLoov_ovBcbL48kLu-i1w",
      },
    });
    dispatch({ type: GET_BOOKS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_BOOKS_FAILED, payload: error.message });
  }
};
