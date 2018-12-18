import * as types from "./actionTypes";
import history from "../../history";

function getUserApi() {
  return "http://localhost:5000/api/get-user";
}

export function verifyUser(authUser) {
  console.log("verify user", authUser);
  return { type: types.VERIFY_USER, authUser: authUser };
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
      .then(authUser => dispatch(verifyUser(authUser)));
  };
}
