import * as types from "./actionTypes";
function getStudentTestResultsApi(id) {
  return `http://localhost:5000/api/get-student-test/${id}`;
}

export function receiveStudentTestResults(studentTestResults) {
  return {
    type: types.RECEIVE_STUDENT_TEST_RESULTS,
    studentTestResults: studentTestResults
  };
}

export function fetchStudentTestResults(id, user) {
  let student = id;
  return dispatch => {
    return fetch(getStudentTestResultsApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(studentTestResults =>
        dispatch(receiveStudentTestResults(studentTestResults))
      );
  };
}
