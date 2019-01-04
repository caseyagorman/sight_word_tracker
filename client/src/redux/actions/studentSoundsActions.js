import * as types from "./actionTypes";
function studentSounds() {
  return "http://localhost:5000/api/get-learned-words";
}

function addStudentSounds(studentWords) {
  return "http://localhost:5000/api/add-word-to-student";
}

export function addStudentWords(studentWords, user) {
  console.log("addStudentWords", studentWords);
  return dispatch => {
    return fetch(addStudentSounds(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(studentWords)
    });
  };
}

export function receiveStudentWords(studentWords) {
  return { type: types.RECEIVE_STUDENT_WORDS, studentWords: studentWords };
}

export function fetchStudentWords(id, user) {
  return dispatch => {
    return fetch(studentSounds(id), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(studentWords => dispatch(receiveStudentWords(studentWords)));
  };
}
