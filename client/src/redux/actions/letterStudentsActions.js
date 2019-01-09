import * as types from "./actionTypes";
function getLetterApi(id) {
  return `http://localhost:5000/api/letter-detail/${id}`;
}

function addLetterStudentsApi() {
  return "http://localhost:5000/api/add-student-to-letter";
}

export function receiveLetter(letter) {
  return { type: types.RECEIVE_LETTER, letter: letter };
}

export function addLetterStudents(letterStudents, user) {
  return dispatch => {
    return fetch(addLetterStudentsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(letterStudents)
    })
      .then(() => dispatch(fetchLetter(letterStudents.letter, user)))
      .then(() =>
        dispatch(fetchUnknownLetterStudents(letterStudents.letter, user))
      );
  };
}

export function fetchLetter(id, user) {
  return dispatch => {
    return fetch(getLetterApi(id), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(letter => dispatch(receiveLetter(letter)));
  };
}
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
