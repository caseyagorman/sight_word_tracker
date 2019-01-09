import * as types from "./actionTypes";
import history from "../../history";
function getSoundApi(id) {
  return `http://localhost:5000/api/sound-detail/${id}`;
}

function addSoundApi() {
  return "http://localhost:5000/api/add-sound";
}

function deleteSoundApi() {
  return "http://localhost:5000/api/delete-sound";
}

export function receiveSound(sound) {
  return { type: types.RECEIVE_SOUND, sound: sound };
}

export function receiveSounds(sounds) {
  return { type: types.RECEIVE_SOUNDS, sounds: sounds };
}

export function fetchSound(id, user) {
  return dispatch => {
    return fetch(getSoundApi(id), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(sound => dispatch(receiveSound(sound)));
  };
}
function fetchStudentsApi(user) {
  return "http://localhost:5000/api/sounds";
}

export function fetchSounds(user) {
  return dispatch => {
    return fetch(fetchStudentsApi(user), {
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
export function deleteSound(sound, user) {
  return dispatch => {
    return fetch(deleteSoundApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(sound)
    })
      .then(() => dispatch(fetchSounds(user)))
      .then(() => history.push("/sounds"));
  };
}

export function addSound(sound, user) {
  return dispatch => {
    return fetch(addSoundApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "x-access-token": user
      },
      body: JSON.stringify(sound)
    })
      .then(() => dispatch(fetchSounds(user)))
      .then(() => history.push("/sounds"));
  };
}
