import * as types from "./actionTypes";
function getStudentWordTestResultsApi(id) {
  return `http://localhost:5000/api/get-student-test/${id}`;
}

export function receiveStudentWordTestResults(studentWordTestResults) {
  return {
    type: types.RECEIVE_STUDENT_WORD_TEST_RESULTS,
    studentWordTestResults: studentWordTestResults
  };
}

export function fetchStudentWordTestResults(id, user) {
  let student = id;
  return dispatch => {
    return fetch(getStudentWordTestResultsApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(studentWordTestResults =>
        dispatch(receiveStudentWordTestResults(studentWordTestResults))
      );
  };
}
