import * as types from "./actionTypes";

function getWordApi(id) {
  return `http://localhost:5000/api/word-detail/${id}`;
}

export function receiveWord(word) {
  console.log("word", word);
  return { type: types.RECEIVE_WORD, word: word };
}

export function fetchWord(id) {
  console.log("fetch id", id);
  let wordId = id.id;
  console.log("word Id", wordId);
  return dispatch => {
    return fetch(getWordApi(wordId), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(word => dispatch(receiveWord(word)));
  };
}
