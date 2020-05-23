import axios from 'axios';
import {
  GET_ERRORS,
} from "../actions/types";

const assignmentApi = axios.create({
    baseURL: 'http://ec2-3-8-215-33.eu-west-2.compute.amazonaws.com/api',
})

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

export const setAssignment = (userData, history) => dispatch => {
  axios
    .post("/api/assignments/setAssignment", userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const submitAssignment = (userData, history) => dispatch => {
  axios
    .post("/api/assignments/submitAssignment", userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getClassroomAssignments = class_name => assignmentApi.get(`assignments/getClassroomAssignments/${class_name}`);
export const getStudentAssignments = student_username => assignmentApi.get(`assignments/getStudentAssignments/${student_username}`);
export const getAssignments = teacher_username => assignmentApi.get(`assignments/getAssignments/${teacher_username}`);
export const getAssignment = assignment_name => assignmentApi.get(`assignments/getAssignment/${assignment_name}`);
export const getStudentAssignment = assignment_name => assignmentApi.get(`assignments/getStudentAssignment/${assignment_name}`);
