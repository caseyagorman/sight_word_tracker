import * as types from "./actionTypes";
function getStudentTestApi(id) {
  return `http://localhost:5000/api/get-student-test/${id}`;
}

export function receiveStudentTest(studentTestResults) {
  return {
    type: types.RECEIVE_STUDENT_TEST,
    studentTestResults: studentTestResults
  };
}

export function fetchStudentTest(id) {
  console.log("fetch id", id);
  let studentId = id.id;
  return dispatch => {
    return fetch(getStudentTestApi(studentId), {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(studentTestResults =>
        dispatch(receiveStudentTest(studentTestResults))
      );
  };
}
