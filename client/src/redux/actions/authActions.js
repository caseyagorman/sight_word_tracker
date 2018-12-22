import * as types from "./actionTypes";
import history from "../../history";
import React from "react";
import { Redirect } from "react-router";

function getUserApi() {
  return "http://localhost:5000/api/login";
}

export function setUser(auth) {
  console.log("setting user", auth);
  return { type: types.SET_USER, auth: auth };
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
      .then(user => dispatch(setUser(user)))
      .catch(err => console.error(err));
  };
}
