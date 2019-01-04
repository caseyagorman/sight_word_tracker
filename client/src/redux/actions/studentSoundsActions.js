import * as types from "./actionTypes";
function studentSounds() {
  return "http://localhost:5000/api/get-learned-words";
}

function addStudentSoundsApi() {
  return "http://localhost:5000/api/add-sound-to-student";
}

export function addStudentSounds(studentSounds, user) {
  console.log("studentSounds", studentSounds);
  return dispatch => {
    return fetch(addStudentSoundsApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(studentSounds)
    });
  };
}

export function receiveStudentSounds(studentSounds) {
  return { type: types.RECEIVE_STUDENT_SOUNDS, studentSounds: studentSounds };
}

export function fetchStudentSounds(id, user) {
  return dispatch => {
    return fetch(studentSounds(id), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(studentSounds => dispatch(receiveStudentSounds(studentSounds)));
  };
}
