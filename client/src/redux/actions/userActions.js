import * as types from "./actionTypes";

function getWordApi(id) {
  return `http://localhost:5000/api/word-detail/${id}`;
}

function addUserApi() {
  return "http://localhost:5000/api/add-word";
}

export function addUser(user) {
  return dispatch => {
    return fetch(addUserApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => console.log(response));
  };
}
