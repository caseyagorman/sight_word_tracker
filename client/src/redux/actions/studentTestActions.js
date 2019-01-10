import * as types from "./actionTypes";

import {
  STUDENT_TEST_ANSWER_QUESTION,
  STUDENT_TEST_BEGIN_TEST
} from "./actionTypes";

// import history from "../../history";

export function beginTest(testType) {
  console.log("Begin student test action", testType);
  return {
    type: STUDENT_TEST_BEGIN_TEST,
    payload: { testType }
  };
}

export function answerQuestion(questionItem, answeredCorrectly) {
  console.log(
    "question Item",
    questionItem,
    "answered correctly",
    answeredCorrectly
  );
  return {
    type: STUDENT_TEST_ANSWER_QUESTION,
    payload: {
      testItem: questionItem,
      answeredCorrectly
    }
  };
}

// export function submitStudentTest(testType, testItems){
//   return true
// }

function addLetterTestApi() {
  return "http://localhost:5000/api/create-student-letter-test";
}

function getStudentApi(id) {
  return `http://localhost:5000/api/details/${id}`;
}
// ===== This is what you're going to turn into
// submitStudentTest
export function submitStudentTest(studentTest, testType, studentId, user) {
  console.log("StudentTest", studentTest, "test type", testType);
  return dispatch => {
    return fetch(addLetterTestApi(), {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user
      },
      body: JSON.stringify({ studentTest, testType, studentId })
    });
    // .then(() => dispatch(fetchStudent(result.student, user)))
    // .then(() => history.push(`/details/${result.student}`));
  };
}
export function receiveStudent(student) {
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
