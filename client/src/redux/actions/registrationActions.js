import * as types from "./actionTypes";
import history from "../../history";
function registerUserApi() {
  return "http://localhost:5000/api/register";
}

export function registerUser(user) {
  return dispatch => {
    return fetch(registerUserApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(() => history.push("/login"));
  };
}
