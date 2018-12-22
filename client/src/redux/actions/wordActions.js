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

export function receiveWord(word) {
  return { type: types.RECEIVE_WORD, word: word };
}

export function fetchWord(id, user) {
  console.log("student action", id, user);
  return dispatch => {
    return fetch(getWordApi(id), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(word => dispatch(receiveWord(word)));
  };
}
export function deleteWord(word) {
  return dispatch => {
    return fetch(deleteWordApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(word)
    }).then(() => history.push("/words"));
  };
}

export function addWord(word) {
  console.log("ADD WORD", word);
  return dispatch => {
    return fetch(addWordApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(word)
    }).then(response => console.log(response));
  };
}
