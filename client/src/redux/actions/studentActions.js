import * as types from "./actionTypes";
import history from "../../history";
import { fetchStudents } from "./studentsActions";
function addStudentApi() {
  return "http://localhost:5000/api/add-student";
}
function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}
function deleteStudentApi() {
  return "http://localhost:5000/api/delete-student";
}

export function receiveStudents(students) {
  return { type: types.RECEIVE_STUDENTS, students: students };
}

export function addStudent(student, user) {
  return dispatch => {
    return fetch(addStudentApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(student)
    })
      .then(response => console.log(response))
      .then(() => history.push("/students"));
  };
}

export function deleteStudent(student, user) {
  return dispatch => {
    return fetch(deleteStudentApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(student)
    }).then(() => dispatch(fetchStudents(user)));
  };
}

export function receiveStudent(student) {
  return { type: types.RECEIVE_STUDENT, student: student };
}

export function fetchStudent(student, user) {
  return dispatch => {
    return fetch(getStudentApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(fetchStudents(user))
      .then(response => response.json())
      .then(students => dispatch(receiveStudents(students)));
  };
}
