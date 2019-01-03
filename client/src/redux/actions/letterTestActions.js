// import * as types from "./actionTypes";
import history from "../../history";
function addLetterTestApi() {
  return "http://localhost:5000/api/create-student-letter-test";
}

export function addLetterTest(result, user) {
  return dispatch => {
    return fetch(addLetterTestApi(), {
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
