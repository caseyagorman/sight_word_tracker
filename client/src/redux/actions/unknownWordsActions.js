import * as types from "./actionTypes";

function getUnknownWordsApi(id) {
  return `http://localhost:5000/api/unknown-words/${id}`;
}

export function receiveUnknownWords(unknownWords) {
  return { type: types.RECEIVE_UNKNOWN_WORDS, unknownWords: unknownWords };
}

export function fetchUnknownWords(studentId, user) {
  console.log("id", studentId, "user", user);
  return dispatch => {
    return (
      fetch(getUnknownWordsApi(studentId), {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        // .then(words => console.log("WORDS", words));
        .then(unknownWords => dispatch(receiveUnknownWords(unknownWords)))
    );
  };
}
