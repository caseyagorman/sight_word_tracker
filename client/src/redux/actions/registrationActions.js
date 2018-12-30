import * as types from "./actionTypes";
function registerUserApi() {
  return "http://localhost:5000/api/register";
}
export function checkNewUser(newUser) {
  console.log("newUser", newUser);
  // if (newUser.error) {
  //   console.log("error", newUser.error);
  //   return { type: types.REGISTER_ERROR, newUser: newUser };
  // }
  // console.log("new user", newUser);
  // return { type: types.REGISTER_USER, newUser: newUser };
}

export function registerUser(newUser) {
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
      .then(response => console.log(response))
      .then(newUser => console.log(newUser));

    // .then(newUser => dispatch(checkNewUser(newUser)));
  };
}
