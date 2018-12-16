import * as types from "./actionTypes";

function getUnknownWordsApi(id) {
  return `http://localhost:5000/api/unknown-words/${id}`;
}

export function receiveUnknownWords(words) {
  console.log("words", words);
  return { type: types.RECEIVE_UNKNOWN_WORDS, words: words };
}

export function fetchUnknownWords(id) {
  console.log("fetch id", id);
  let studentId = id.id;
  console.log("student Id", studentId);
  return dispatch => {
    return fetch(getUnknownWordsApi(studentId), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(words => console.log("WORDS", words));
    // .then(json => dispatch(receiveUnknownWords(json)))
  };
}
