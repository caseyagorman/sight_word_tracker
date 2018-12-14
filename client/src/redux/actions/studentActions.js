import * as types from "./actionTypes";

function api() {
  return "http://localhost:5000/api/students/";
}

export function receiveStudents(json) {
  return { type: types.RECEIVE_STUDENTS, students: json };
}

export function fetchStudents() {
  return dispatch => {
    return fetch(api(), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveStudents(json)));
  };
}
