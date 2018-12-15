import initialState from "./initialState";
import {
  FETCH_STUDENT_WORDS,
  RECEIVE_STUDENT_WORDS
} from "../actions/actionTypes";

export default function studentWords(
  state = initialState.studentWords,
  action
) {
  let newState;
  console.log("new state", newState);
  switch (action.type) {
    case FETCH_STUDENT_WORDS:
      console.log("FETCH_WORDS Action");
      console.log("action", action);
      return action;
    case RECEIVE_STUDENT_WORDS:
      newState = action.studentWords;
      console.log("action", action);
      console.log("new state", newState);
      console.log("RECEIVE_STUDENT_WORDS Action");
      return newState;
    default:
      return state;
  }
}
