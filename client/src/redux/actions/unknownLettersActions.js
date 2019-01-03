import * as types from "./actionTypes";

function getUnknownLettersApi(id) {
  return `http://localhost:5000/api/unknown-letters/${id}`;
}

export function receiveUnknownLetters(unknownLetters) {
  return {
    type: types.RECEIVE_UNKNOWN_LETTERS,
    unknownLetters: unknownLetters
  };
}

export function fetchUnknownLetters(student, user) {
  return dispatch => {
    return fetch(getUnknownLettersApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(unknownLetters => dispatch(receiveUnknownLetters(unknownLetters)));
  };
}
