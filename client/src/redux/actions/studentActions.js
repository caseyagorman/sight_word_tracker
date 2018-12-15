import * as types from "./actionTypes";
import axios from "axios";

function addStudentApi() {
  return "http://localhost:5000/api/add-student/";
}

export function createStudent(student) {
  return { type: types.CREATE_STUDENT, student: student };
}

export function addStudent() {
  return dispatch => {
    return axios
      .post(addStudentApi(), {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.student())
      .then(student => dispatch(addStudent(student)));
  };
}
