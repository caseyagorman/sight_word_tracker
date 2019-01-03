import * as types from "./actionTypes";
import history from "../../history";
// function studentLettersApi() {
//   return "http://localhost:5000/api/get-learned-words";
// }

function addStudentLettersApi(studentLetters) {
  return "http://localhost:5000/api/add-letters-to-student";
}

export function addstudentLetters(studentLetters, user) {
  return dispatch => {
    return fetch(addStudentLettersApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(studentLetters)
    }).then(() => history.push("/students"));
  };
}

export function receivestudentLetters(studentLetters) {
  return { type: types.RECEIVE_STUDENT_WORDS, studentLetters: studentLetters };
}
