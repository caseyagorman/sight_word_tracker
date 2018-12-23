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

export function fetchStudentTestResults(id, userId) {
  let studentId = id;
  return dispatch => {
    return fetch(getStudentTestResultsApi(studentId), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userId)
    })
      .then(response => response.json())
      .then(studentTestResults =>
        dispatch(receiveStudentTestResults(studentTestResults))
      );
  };
}
