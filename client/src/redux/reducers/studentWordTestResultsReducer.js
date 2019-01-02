import initialState from "./initialState";
import {
  FETCH_STUDENT_WORD_TEST_RESULTS,
  RECEIVE_STUDENT_WORD_TEST_RESULTS
} from "../actions/actionTypes";

export default function studentWordTestResults(
  state = initialState.studentWordTestResults,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENT_WORD_TEST_RESULTS:
      console.log("FETCH_STUDENT_WORD_TEST_RESULTS Action");
      return action;
    case RECEIVE_STUDENT_WORD_TEST_RESULTS:
      newState = action.studentWordTestResults;
      console.log("RECEIVE_STUDENT_WORD_TEST_RESULTS Action");
      return newState;
    default:
      return state;
  }
}
