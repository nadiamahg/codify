import axios from 'axios';
import {
  GET_ERRORS,
} from "../actions/types";

export const newAssignment = (userData, history) => dispatch => {
  axios
    .post("/api/assignments/newAssignment", userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};