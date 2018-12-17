import * as types from "./actionTypes";
import history from "../../history";
function addUserApi() {
  return "http://localhost:5000/api/add-user";
}

export function addUser(user) {
  console.log("USER", user);
  return dispatch => {
    return fetch(addUserApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(() => history.push("/"));
  };
}
