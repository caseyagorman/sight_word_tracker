import * as types from "./actionTypes";

function api() {
  return "http://localhost:5000/api/get-learned-words";
}

export function receiveStudentWords(studentWords) {
  return { type: types.RECEIVE_STUDENT_WORDS, studentWords: studentWords };
}

export function fetchStudentWords() {
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
      .then(studentWords => dispatch(receiveStudentWords(studentWords)));
  };
}
