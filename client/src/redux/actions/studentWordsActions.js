import * as types from "./actionTypes";
import history from "../../history";
// function studentWordsApi() {
//   return "http://localhost:5000/api/get-learned-words";
// }

function addStudentWordsApi(studentWords) {
  return "http://localhost:5000/api/add-word-to-student";
}

export function addStudentWords(studentWords, user) {
  return dispatch => {
    return fetch(addStudentWordsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(studentWords)
    }).then(() => history.push("/students"));
  };
}

export function receiveStudentWords(studentWords) {
  return { type: types.RECEIVE_STUDENT_WORDS, studentWords: studentWords };
}

// export function fetchStudentWords(id, user) {
//   return dispatch => {
//     return fetch(studentWordsApi(id), {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "x-access-token": user
//       }
//     })
//       .then(response => response.json())
//       .then(studentWords => dispatch(receiveStudentWords(studentWords)));
//   };
// }
