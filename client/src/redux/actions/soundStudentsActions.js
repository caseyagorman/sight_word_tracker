import * as types from "./actionTypes";
function addSoundStudentsApi() {
  return "http://localhost:5000/api/add-student-to-sound";
}
function getSoundApi(id) {
  return `http://localhost:5000/api/sound-detail/${id}`;
}

export function addSoundStudents(soundStudents, user) {
  return dispatch => {
    return fetch(addSoundStudentsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(soundStudents)
    })
      .then(() => dispatch(fetchSound(soundStudents.sound, user)))
      .then(() =>
        dispatch(fetchUnknownSoundStudents(soundStudents.sound, user))
      );
  };
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

export function receiveSound(sound) {
  return { type: types.RECEIVE_SOUND, sound: sound };
}

function getUnknownSoundStudents(id) {
  return `http://localhost:5000/api/sound-unknown-students/${id}`;
}

export function receiveUnknownSoundStudents(unknownSoundStudents) {
  return {
    type: types.RECEIVE_UNKNOWN_SOUND_STUDENTS,
    unknownSoundStudents: unknownSoundStudents
  };
}

export function fetchUnknownSoundStudents(sound, user) {
  return dispatch => {
    return fetch(getUnknownSoundStudents(sound), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())

      .then(unknownSoundStudents =>
        dispatch(receiveUnknownSoundStudents(unknownSoundStudents))
      );
  };
}
