import * as types from "./actionTypes";

function getUnknownWordStudentsApi(id) {
  return `http://localhost:5000/api/word-unknown-students/${id}`;
}

export function receiveUnknownWordStudents(unknownWordStudents) {
  console.log(unknownWordStudents);
  return {
    type: types.RECEIVE_UNKNOWN_WORD_STUDENTS,
    unknownWordStudents: unknownWordStudents
  };
}

export function fetchUnknownWordStudents(word, user) {
  return dispatch => {
    return fetch(getUnknownWordStudentsApi(word), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())

      .then(unknownWordStudents =>
        dispatch(receiveUnknownWordStudents(unknownWordStudents))
      );
  };
}
