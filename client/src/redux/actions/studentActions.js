import * as types from "./actionTypes";
import history from "../../history";
function addStudentApi() {
  return "http://localhost:5000/api/add-student";
}
function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}
function deleteStudentApi() {
  return "http://localhost:5000/api/delete-student";
}

export function addStudent(student, user) {
  console.log("add student action", "student", student, "user", user);
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
  console.log("delete student", student, user);
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
    }).then(() => history.push("/students"));
  };
}

export function receiveStudent(student) {
  return { type: types.RECEIVE_STUDENT, student: student };
}

export function fetchStudent(student, user) {
  console.log("fetch student", student, user);
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
      .then(response => response.json())
      .then(student => dispatch(receiveStudent(student)));
  };
}
