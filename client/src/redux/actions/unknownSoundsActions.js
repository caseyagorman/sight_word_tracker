import * as types from "./actionTypes";

function getUnknownSoundsApi(id) {
  return `http://localhost:5000/api/unknown-sounds/${id}`;
}

export function receiveUnknownSounds(unknownSounds) {
  return {
    type: types.RECEIVE_UNKNOWN_SOUNDS,
    unknownSounds: unknownSounds
  };
}

export function fetchUnknownSounds(student, user) {
  return dispatch => {
    return fetch(getUnknownSoundsApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(unknownSounds => dispatch(receiveUnknownSounds(unknownSounds)));
  };
}
