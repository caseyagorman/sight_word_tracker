import * as types from "./actionTypes";

function getDolchWordsApi(id) {
  return `http://localhost:5000/api/dolch-words/${id}`;
}

export function fetchDolchWords(student, user) {
  return dispatch => {
    return fetch(getDolchWordsApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(dolchWords => dispatch(receiveDolchWords(dolchWords)));
  };
}
export function receiveDolchWords(dolchWords) {
  return { type: types.RECEIVE_DOLCH_WORDS, dolchWords: dolchWords };
}
