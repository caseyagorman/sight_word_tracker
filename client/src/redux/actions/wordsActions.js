import * as types from "./actionTypes";

function api(user) {
  return "http://localhost:5000/api/words";
}

export function receiveWords(words) {
  return { type: types.RECEIVE_WORDS, words: words };
}

export function fetchWords(user) {
  return dispatch => {
    return fetch(api(user), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(words => dispatch(receiveWords(words)));
  };
}
