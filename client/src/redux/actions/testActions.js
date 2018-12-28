// import * as types from "./actionTypes";
import history from "../../history";
function addTestApi() {
  return "http://localhost:5000/api/create-student-test";
}

export function addTest(result, user) {
  console.log("add test action", result, user);
  return dispatch => {
    return fetch(addTestApi(), {
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
