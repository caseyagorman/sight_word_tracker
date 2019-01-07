import * as types from "./actionTypes";

function getUnknownSoundStudents(id) {
  return `http://localhost:5000/api/sound-unknown-students/${id}`;
}

export function receiveUnknownSoundStudents(unknownSoundStudents) {
  console.log("unknownSoundStudents", unknownSoundStudents);
  return {
    type: types.RECEIVE_UNKNOWN_SOUND_STUDENTS,
    unknownSoundStudents: unknownSoundStudents
  };
}

export function fetchUnknownSoundStudents(sound, user) {
  console.log("fetch unknownSoundStudents", sound, user);
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
