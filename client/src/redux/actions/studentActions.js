import * as types from "./actionTypes";

function addStudentApi() {
  return "http://localhost:5000/api/add-student";
}
function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}
function deleteStudentApi() {
  return "http://localhost:5000/api/delete-student";
}

export function addStudent(student) {
  return dispatch => {
    return fetch(addStudentApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    }).then(response => console.log(response));
  };
}

export function deleteStudent(student) {
  return dispatch => {
    return fetch(deleteStudentApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    }).then(response => console.log(response));
  };
}

export function receiveStudent(student) {
  return { type: types.RECEIVE_STUDENT, student: student };
}

export function fetchStudent(id) {
  console.log("fetch id", id);
  let studentId = id.id;
  console.log("student Id", studentId);
  return dispatch => {
    return fetch(getStudentApi(studentId), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(student => dispatch(receiveStudent(student)));
  };
}
