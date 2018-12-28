import * as types from "./actionTypes";

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
