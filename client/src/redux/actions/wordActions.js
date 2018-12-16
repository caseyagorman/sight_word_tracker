import * as types from "./actionTypes";

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
  console.log("word", word);
  return { type: types.RECEIVE_WORD, word: word };
}

export function fetchWord(id) {
  let wordId = id.id;
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
    }).then(response => console.log(response));
    // .then(() => {
    //   this.props.history.push("/words");
    // });
  };
}

export function addWord(word) {
  console.log("add word", word);
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
