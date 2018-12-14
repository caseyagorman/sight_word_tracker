import * as types from "./actionTypes";

function api() {
  return "https://localhost:5000/api/students/";
}

export function getStudents(json) {
  return { type: types.GET_STUDENTS, students: json.students };
}

export function fetchStudents() {
  return dispatch => {
    return fetch(api(), {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => dispatch(getStudents(json)));
  };
}
