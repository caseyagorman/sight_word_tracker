import initialState from "./initialState";
import {
  FETCH_STUDENT_TEST,
  RECEIVE_STUDENT_TEST
} from "../actions/actionTypes";

export default function studentTestResults(
  state = initialState.studentTestResults,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENT_TEST:
      console.log("FETCH_STUDENT Action");
      return action;
    case RECEIVE_STUDENT_TEST:
      newState = action.studentTestResults;
      console.log("RECEIVE_STUDENT_TEST Action");
      return newState;
    default:
      return state;
  }
}
