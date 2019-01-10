import initialState from "./initialState";
import {
  STUDENT_TEST_ANSWER_QUESTION,
  STUDENT_TEST_SUBMIT_TEST,
  STUDENT_TEST_SUBMIT_TEST_SUCCESS,
  STUDENT_TEST_CLEAR_TEST,
  STUDENT_TEST_BEGIN_TEST
} from "../actions/actionTypes";

export default function studentTest(state = initialState.studentTest, action) {
  switch (action.type) {
    case STUDENT_TEST_ANSWER_QUESTION:
      const testResult = action.payload;

      return Object.assign({}, state, {
        testItems: [
          ...state.testItems,
          {
            testItems: testResult.testItem,
            answeredCorrectly: testResult.answeredCorrectly
          }
        ]
      });
    case STUDENT_TEST_BEGIN_TEST:
      const testType = action.payload.testType;
      return Object.assign({}, state, {
        testType: testType
      });

    case STUDENT_TEST_SUBMIT_TEST:
      // First, we figure out what kind of test we're dealing with
      // const testType = state.testType;
      // fetch(getUnknownWordStudentsApi(word), {
      //   method: "GET",
      //   mode: "cors",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "x-access-token": user
      //   }
      // });
      return Object.assign({}, state, {
        submittingTest: true
      });
    case STUDENT_TEST_SUBMIT_TEST_SUCCESS:
      return Object.assign({}, state, {
        submittingTest: true
      });
    case STUDENT_TEST_CLEAR_TEST:
      return Object.assign({}, state, {
        test: []
      });
    default:
      return state;
  }
}
