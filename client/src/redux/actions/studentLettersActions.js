import * as types from "./actionTypes";
import history from "../../history";

function addStudentLettersApi() {
  return "http://localhost:5000/api/add-letters-to-student";
}
function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}
export function addStudentLetters(studentLetters, user) {
  return dispatch => {
    return fetch(addStudentLettersApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify(studentLetters)
    })
      .then(() => dispatch(fetchStudent(studentLetters.student, user)))
      .then(() => dispatch(fetchUnknownLetters(studentLetters.student, user)));
  };
}

export function receivestudentLetters(studentLetters) {
  return { type: types.RECEIVE_STUDENT_WORDS, studentLetters: studentLetters };
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

function getUnknownLettersApi(id) {
  return `http://localhost:5000/api/unknown-letters/${id}`;
}

export function receiveUnknownLetters(unknownLetters) {
  return {
    type: types.RECEIVE_UNKNOWN_LETTERS,
    unknownLetters: unknownLetters
  };
}

export function fetchUnknownLetters(student, user) {
  return dispatch => {
    return fetch(getUnknownLettersApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(unknownLetters => dispatch(receiveUnknownLetters(unknownLetters)));
  };
}
