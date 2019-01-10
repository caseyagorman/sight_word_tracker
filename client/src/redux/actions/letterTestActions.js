import * as types from "./actionTypes";
import history from "../../history";
function addLetterTestApi() {
  return "http://localhost:5000/api/create-student-letter-test";
}

function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}
export function addLetterTest(result, user) {
  return dispatch => {
    return fetch(addLetterTestApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(result)
    })
      .then(() => dispatch(fetchStudent(result.student, user)))
      .then(() => history.push(`/details/${result.student}`));
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
      .then(response => response.json())
      .then(student => dispatch(receiveStudent(student)));
  };
}
