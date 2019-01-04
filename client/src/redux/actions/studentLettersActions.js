import * as types from "./actionTypes";
import history from "../../history";

function addStudentLettersApi() {
  return "http://localhost:5000/api/add-letters-to-student";
}

export function addStudentLetters(studentLetters, user) {
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
