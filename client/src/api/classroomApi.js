import axios from 'axios';
import {
  GET_ERRORS,
} from "../actions/types";

const classroomApi = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const newClassroom = (userData, history) => dispatch => {
  axios
    .post("/api/classrooms/newClassroom", userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getClassrooms = username => classroomApi.get(`classrooms/getClassrooms/${username}`);
export const getClassroom = class_name => classroomApi.get(`classrooms/getClassroom/${class_name}`);
export const getStudents = class_name => classroomApi.get(`classrooms/getStudents/${class_name}`);
export const deleteClassroom = (class_name, class_code) => classroomApi.delete(`classrooms/deleteClassroom/${class_name}/${class_code}`);