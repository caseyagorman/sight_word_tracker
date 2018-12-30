import * as types from "./actionTypes";
function registerUserApi() {
  return "http://localhost:5000/api/register";
}
export function checkNewUser(newUser) {
  console.log("newUser", newUser);
  if (!newUser.error) {
    console.log("error", newUser);
    return { type: types.REGISTER_USER, newUser: newUser };
  } else if (newUser.error) {
    console.log("new user", newUser.error);
    return { type: types.REGISTER_USER, newUser: newUser };
  }
}

export function registerUser(newUser) {
  console.log("register user", newUser);
  return dispatch => {
    return fetch(registerUserApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(newUser => dispatch(checkNewUser(newUser)))
      .catch(err => console.error(err));
  };
}
