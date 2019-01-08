import * as types from "./actionTypes";

function getUnknownLetterStudentsApi(id) {
  return `http://localhost:5000/api/letter-unknown-students/${id}`;
}

export function receiveUnknownLetterStudents(unknownLetterStudents) {
  return {
    type: types.RECEIVE_UNKNOWN_LETTER_STUDENTS,
    unknownLetterStudents: unknownLetterStudents
  };
}

export function fetchUnknownLetterStudents(letter, user) {
  return dispatch => {
    return fetch(getUnknownLetterStudentsApi(letter), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())

      .then(unknownLetterStudents =>
        dispatch(receiveUnknownLetterStudents(unknownLetterStudents))
      );
  };
}
