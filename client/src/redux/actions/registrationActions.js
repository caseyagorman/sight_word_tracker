import * as types from "./actionTypes";
function registerUserApi() {
  return "http://localhost:5000/api/register";
}
export function checkNewUser(register) {
  console.log("newUser", register);
  if (!register.error) {
    console.log("error", register);
    return { type: types.REGISTER_USER, register: register };
  } else if (register.error) {
    console.log("new user", register.error);
    return { type: types.REGISTER_USER, register: register };
  }
}

export function registerUser(newUser) {
  console.log("register user", newUser);
  return dispatch => {
    return (
      fetch(registerUserApi(), {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
        .then(response => response.json())
        // .then(newUser => console.log("new user action", newUser));
        .then(newUser => dispatch(checkNewUser(newUser)))
        .catch(err => console.error(err))
    );
  };
}
