import * as types from "./actionTypes";

function api() {
  return "http://localhost:5000/api/words/";
}

export function receiveWords(words) {
  return { type: types.RECEIVE_WORDS, words: words };
}

export function fetchWords() {
  return dispatch => {
    return fetch(api(), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(words => dispatch(receiveWords(words)));
  };
}
