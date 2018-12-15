import * as types from "./actionTypes";
import axios from "axios";

function addStudentApi() {
  return "http://localhost:5000/api/add-student/";
}

export function newStudent(json) {
  return { type: types.ADD_STUDENT, student: json };
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
      .then(response => response.json())
      .then(json => dispatch(addStudent(json)));
  };
}
