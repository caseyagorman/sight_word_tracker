import * as types from "./actionTypes";
import history from "../../history";
function getWordApi(id) {
  return `http://localhost:5000/api/word-detail/${id}`;
}

function addWordApi() {
  return "http://localhost:5000/api/add-word";
}

function deleteWordApi() {
  return "http://localhost:5000/api/delete-word";
}

function api(user) {
  return "http://localhost:5000/api/words";
}
export function receiveWord(word) {
  return { type: types.RECEIVE_WORD, word: word };
}

export function fetchWord(id, user) {
  return dispatch => {
    return fetch(getWordApi(id), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(word => dispatch(receiveWord(word)));
  };
}
export function deleteWord(word, user) {
  console.log("deleteWord", word, user);
  return dispatch => {
    return fetch(deleteWordApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(word)
    })
      .then(() => dispatch(fetchWords(user)))
      .then(() => history.push("/words"));
  };
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

export function addWord(word, user) {
  return dispatch => {
    return fetch(addWordApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "x-access-token": user
      },
      body: JSON.stringify(word)
    }).then(() => history.push("/words"));
  };
}
