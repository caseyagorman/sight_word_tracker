import * as types from "./actionTypes";
import history from "../../history";
function getLetterApi(id) {
  return `http://localhost:5000/api/letter-detail/${id}`;
}

function addLetterApi() {
  return "http://localhost:5000/api/add-letter";
}

function deleteLetterApi() {
  return "http://localhost:5000/api/delete-letter";
}

export function receiveLetter(letter) {
  return { type: types.RECEIVE_LETTER, letter: letter };
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
export function deleteLetter(letter, user) {
  return dispatch => {
    return fetch(deleteLetterApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(letter)
    })
      .then(() => dispatch(fetchLetters(user)))
      .then(() => history.push("/letters"));
  };
}

export function addLetter(letter, user) {
  return dispatch => {
    return fetch(addLetterApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "x-access-token": user
      },
      body: JSON.stringify(letter)
    })
      .then(() => dispatch(fetchLetters(user)))
      .then(() => history.push("/letters"));
  };
}
