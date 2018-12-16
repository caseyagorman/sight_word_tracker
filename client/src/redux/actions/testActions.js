// import * as types from "./actionTypes";

function addTestApi() {
  return "http://localhost:5000/api/create-student-test";
}

export function addTest(result) {
  return dispatch => {
    return fetch(addTestApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    }).then(response => console.log(response));
  };
}
