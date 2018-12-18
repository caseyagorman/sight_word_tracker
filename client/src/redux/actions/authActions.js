import * as types from "./actionTypes";
import history from "../../history";

function getUserApi() {
  return "http://localhost:5000/api/get-user";
}

export function verifyUser(user) {
  return { type: types.VERIFY_USER, user: user };
}

export function loginUser(user) {
  return dispatch => {
    console.log("USER", user);
    return (
      fetch(getUserApi(), {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        //   .then(response => response.json())
        .then(user => console.log(user))
    );
    //   .then(user => dispatch(verifyUser(user)));
  };
}
