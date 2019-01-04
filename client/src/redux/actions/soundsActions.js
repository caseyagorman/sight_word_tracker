import * as types from "./actionTypes";

function api(user) {
  return "http://localhost:5000/api/sounds";
}

export function receiveSounds(sounds) {
  return { type: types.RECEIVE_SOUNDS, sounds: sounds };
}

export function fetchSounds(user) {
  return dispatch => {
    return fetch(api(user), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())

      .then(sounds => dispatch(receiveSounds(sounds)));
  };
}
