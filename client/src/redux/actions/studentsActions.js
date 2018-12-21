import * as types from "./actionTypes";
function getStudentsApi(user) {
  console.log("making request", user);
  return "http://localhost:5000/api/students";
}

export function receiveStudents(students) {
  return { type: types.RECEIVE_STUDENTS, students: students };
}

export function fetchStudents(user) {
  console.log("fetching students", user);
  return dispatch => {
    return fetch(getStudentsApi(user), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(students => dispatch(receiveStudents(students)));
  };
}
