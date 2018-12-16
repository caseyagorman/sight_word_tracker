import * as types from "./actionTypes";

function studentWordsApi() {
  return "http://localhost:5000/api/get-learned-words";
}

function addStudentWordsApi(studentWords) {
  return "http://localhost:5000/api/add-word-to-student";
}

export function addStudentWords(studentWords) {
  console.log("studentWords", studentWords);
  return dispatch => {
    return fetch(addStudentWordsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentWords)
    }).then(response => console.log(response));
  };
}

export function receiveStudentWords(studentWords) {
  return { type: types.RECEIVE_STUDENT_WORDS, studentWords: studentWords };
}

export function fetchStudentWords() {
  return dispatch => {
    return fetch(studentWordsApi(), {
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
