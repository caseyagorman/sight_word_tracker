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

export function fetchStudentTestResults(id) {
  let studentId = id.id;
  return dispatch => {
    return fetch(getStudentTestResultsApi(studentId), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(studentTestResults =>
        dispatch(receiveStudentTestResults(studentTestResults))
      );
  };
}
