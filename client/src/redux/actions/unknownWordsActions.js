import * as types from "./actionTypes";

function getUnknownWordsApi(id) {
  return `http://localhost:5000/api/unknown-words/${id}`;
}

export function receiveUnknownWords(unknownWords) {
  return { type: types.RECEIVE_UNKNOWN_WORDS, unknownWords: unknownWords };
}

export function fetchUnknownWords(id) {
  let studentId = id.id;
  return dispatch => {
    return (
      fetch(getUnknownWordsApi(studentId), {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        // .then(words => console.log("WORDS", words));
        .then(unknownWords => dispatch(receiveUnknownWords(unknownWords)))
    );
  };
}
