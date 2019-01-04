import * as types from "./actionTypes";
function getstudentSoundTestResultsApi(id) {
  return `http://localhost:5000/api/get-student-sound-test/${id}`;
}

export function receiveStudentSoundTestResults(studentSoundTestResults) {
  return {
    type: types.RECEIVE_STUDENT_SOUND_TEST_RESULTS,
    studentSoundTestResults: studentSoundTestResults
  };
}

export function fetchstudentSoundTestResults(student, user) {
  console.log("fetch student sound tests", student);

  return dispatch => {
    return fetch(getstudentSoundTestResultsApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(studentSoundTestResults =>
        dispatch(receiveStudentSoundTestResults(studentSoundTestResults))
      );
  };
}
