import initialState from "./initialState";
import {
  FETCH_STUDENT_TEST_RESULTS,
  RECEIVE_STUDENT_TEST_RESULTS
} from "../actions/actionTypes";

export default function studentTestResults(
  state = initialState.studentTestResults,
  action
) {
  let newState;
  console.log(newState);
  switch (action.type) {
    case FETCH_STUDENT_TEST_RESULTS:
      console.log("FETCH_STUDENT_TEST_RESULTS Action");
      return action;
    case RECEIVE_STUDENT_TEST_RESULTS:
      console.log("Something");
      newState = action.studentTestResults;
      console.log("newState", newState);
      console.log("RECEIVE_STUDENT_TEST_RESULTS Action");
      return newState;
    default:
      return state;
  }
}
