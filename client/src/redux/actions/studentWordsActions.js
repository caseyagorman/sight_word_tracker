import * as types from "./actionTypes";
// import history from "../../history";

function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}
function addStudentWordsApi() {
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
    })
      .then(() => dispatch(fetchStudent(studentWords.student, user)))
      .then(() => dispatch(fetchUnknownWords(studentWords.student, user)));
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

// export function receiveStudentWords(studentWords) {
//   return { type: types.RECEIVE_STUDENT_WORDS, studentWords: studentWords };
// }

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

function getUnknownWordsApi(id) {
  return `http://localhost:5000/api/unknown-words/${id}`;
}

export function receiveUnknownWords(unknownWords) {
  return { type: types.RECEIVE_UNKNOWN_WORDS, unknownWords: unknownWords };
}

export function fetchUnknownWords(student, user) {
  return dispatch => {
    return fetch(getUnknownWordsApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(unknownWords => dispatch(receiveUnknownWords(unknownWords)));
  };
}
