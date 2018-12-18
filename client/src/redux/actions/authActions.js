import * as types from "./actionTypes";
import history from "../../history";

function getUserApi() {
  return "http://localhost:5000/api/get-user";
}

export function setUser(user) {
  console.log("set user", user);
  return { type: types.SET_USER, user: user };
}

export function loginUser(user) {
  return dispatch => {
    return fetch(getUserApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(user => dispatch(setUser(user)));
  };
}
