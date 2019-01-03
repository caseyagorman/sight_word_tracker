// import * as types from "./actionTypes";
import history from "../../history";
function addWordTestApi() {
  return "http://localhost:5000/api/create-student-word-test";
}

export function addWordTest(result, user) {
  return dispatch => {
    return fetch(addWordTestApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(result)
    }).then(() => history.push("/students"));
  };
}
