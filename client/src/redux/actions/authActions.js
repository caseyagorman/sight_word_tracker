import * as types from "./actionTypes";

function getUserApi() {
  return "http://localhost:5000/api/login";
}

export function checkUser(auth) {
  if (auth.error) {
    return { type: types.LOGIN_ERROR, auth: auth };
  }
  return { type: types.SET_USER, auth: auth };
}

export function logoutUser(auth) {
  sessionStorage.clear();
  return { type: types.LOGOUT_USER, auth: auth };
}

export function clearErrors() {
  return { type: types.CLEAR_ERRORS };
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
      .then(user => dispatch(checkUser(user)))
      .catch(err => console.error(err));
  };
}
