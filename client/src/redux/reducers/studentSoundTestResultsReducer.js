import initialState from "./initialState";
import {
  FETCH_STUDENT_SOUND_TEST_RESULTS,
  RECEIVE_STUDENT_SOUND_TEST_RESULTS
} from "../actions/actionTypes";

export default function studentSoundTestResults(
  state = initialState.studentSoundTestResults,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENT_SOUND_TEST_RESULTS:
      console.log("FETCH_STUDENT_SOUND_TEST_RESULTS Action");
      return action;
    case RECEIVE_STUDENT_SOUND_TEST_RESULTS:
      newState = action.studentSoundTestResults;
      console.log("RECEIVE_STUDENT_SOUND_TEST_RESULTS Action");
      return newState;
    default:
      return state;
  }
}
