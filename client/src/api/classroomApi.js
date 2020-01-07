import axios from 'axios';
import {
  GET_ERRORS,
} from "../actions/types";

const classroomApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const newClassroom = (userData, history) => dispatch => {
  axios
    .post("/classrooms/newclassroom", userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getClassrooms = username => classroomApi.get(`classrooms/getClassrooms/${username}`);