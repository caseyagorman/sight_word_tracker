import * as types from "./actionTypes";
function studentSounds() {
  return "http://localhost:5000/api/get-learned-words";
}

function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}

function addStudentSoundsApi() {
  return "http://localhost:5000/api/add-sound-to-student";
}

export function addStudentSounds(studentSounds, user) {
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
    })
      .then(() => dispatch(fetchStudent(studentSounds.student, user)))
      .then(() => dispatch(fetchUnknownSounds(studentSounds.student, user)));
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
export function receiveStudent(student) {
  console.log("receive student", student);
  return { type: types.RECEIVE_STUDENT, student: student };
}

export function fetchStudent(student, user) {
  return dispatch => {
    return fetch(getStudentApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(student => dispatch(receiveStudent(student)));
  };
}
