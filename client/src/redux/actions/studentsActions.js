import * as types from "./actionTypes";
function getStudentsApi() {
  return "http://localhost:5000/api/students/";
}

export function receiveStudents(students) {
  return { type: types.RECEIVE_STUDENTS, students: students };
}

export function fetchStudents() {
  return dispatch => {
    return fetch(getStudentsApi(), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(students => dispatch(receiveStudents(students)));
  };
}
