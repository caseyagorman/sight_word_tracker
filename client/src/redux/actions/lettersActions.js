import * as types from "./actionTypes";

function api(user) {
  return "http://localhost:5000/api/letters";
}

export function receiveLetters(letters) {
  return { type: types.RECEIVE_LETTERS, letters: letters };
}

export function fetchLetters(user) {
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
      .then(letters => dispatch(receiveLetters(letters)));
  };
}
