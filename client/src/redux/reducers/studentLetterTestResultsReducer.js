import initialState from "./initialState";
import {
  FETCH_STUDENT_LETTER_TEST_RESULTS,
  RECEIVE_STUDENT_LETTER_TEST_RESULTS
} from "../actions/actionTypes";

export default function studentLetterTestResults(
  state = initialState.studentLetterTestResults,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENT_LETTER_TEST_RESULTS:
      console.log("FETCH_STUDENT_LETTER_TEST_RESULTS Action");
      return action;
    case RECEIVE_STUDENT_LETTER_TEST_RESULTS:
      newState = action.studentLetterTestResults;
      console.log("RECEIVE_STUDENT_LETTER_TEST_RESULTS Action");
      return newState;
    default:
      return state;
  }
}
