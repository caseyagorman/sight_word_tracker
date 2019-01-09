import * as types from "./actionTypes";

function addWordStudentsApi() {
  return "http://localhost:5000/api/add-student-to-word";
}

function getWordApi(id) {
  return `http://localhost:5000/api/word-detail/${id}`;
}
export function addWordStudents(wordStudents, user) {
  console.log("wordStudents", wordStudents);
  return dispatch => {
    return fetch(addWordStudentsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(wordStudents)
    })
      .then(() => dispatch(fetchWord(wordStudents.word, user)))
      .then(() => dispatch(fetchUnknownWordStudents(wordStudents.word, user)));
  };
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

export function receiveWord(word) {
  return { type: types.RECEIVE_WORD, word: word };
}

export function fetchUnknownWordStudents(word, user) {
  console.log("fetcUnknownWord students", word);
  return dispatch => {
    return fetch(getUnknownWordStudentsApi(word), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())

      .then(unknownWordStudents =>
        dispatch(receiveUnknownWordStudents(unknownWordStudents))
      );
  };
}

function getUnknownWordStudentsApi(id) {
  return `http://localhost:5000/api/word-unknown-students/${id}`;
}

export function receiveUnknownWordStudents(unknownWordStudents) {
  return {
    type: types.RECEIVE_UNKNOWN_WORD_STUDENTS,
    unknownWordStudents: unknownWordStudents
  };
}
