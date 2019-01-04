import * as types from "./actionTypes";
function getstudentLetterTestResultsApi(id) {
  return `http://localhost:5000/api/get-student-letter-test/${id}`;
}

export function receiveStudentLettersTestResults(studentLetterTestResults) {
  return {
    type: types.RECEIVE_STUDENT_LETTER_TEST_RESULTS,
    studentLetterTestResults: studentLetterTestResults
  };
}

export function fetchstudentLetterTestResults(student, user) {
  console.log("fetch student letter tests", student);

  return dispatch => {
    return fetch(getstudentLetterTestResultsApi(student), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      }
    })
      .then(response => response.json())
      .then(studentLetterTestResults =>
        dispatch(receiveStudentLettersTestResults(studentLetterTestResults))
      );
  };
}
