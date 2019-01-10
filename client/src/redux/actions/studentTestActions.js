import * as types from "./actionTypes";
import history from "../../history";
import {
  STUDENT_TEST_ANSWER_QUESTION,
  STUDENT_TEST_BEGIN_TEST,
  STUDENT_TEST_CLEAR_TEST
} from "./actionTypes";

export function beginTest(testType) {
  return {
    type: STUDENT_TEST_BEGIN_TEST,
    payload: { testType }
  };
}

export function receiveStudentTest() {
  return {
    type: STUDENT_TEST_CLEAR_TEST
  };
}

export function answerQuestion(questionItem, answeredCorrectly) {
  return {
    type: STUDENT_TEST_ANSWER_QUESTION,
    payload: {
      testItem: questionItem,
      answeredCorrectly
    }
  };
}

function addTestApi() {
  return "http://localhost:5000/api/create-student-test";
}

function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}

export function submitStudentTest(studentTest, testType, studentId, user) {
  console.log("StudentTest", studentTest, "test type", testType);
  return dispatch => {
    return fetch(addTestApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify({ studentTest, testType, studentId })
    })
      .then(response => response.json())
      .then(() => history.push(`/details/${studentId}`))
      .then(() => dispatch(receiveStudentTest()));
  };
}
export function receiveStudent(student) {
  console.log("student", student);
  return { type: types.RECEIVE_STUDENT, student: student };
}

export function fetchStudent(student, user) {
  console.log("fetching student", student, user);
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
