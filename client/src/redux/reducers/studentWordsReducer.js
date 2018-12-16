import initialState from "./initialState";
import {
  FETCH_STUDENT_WORDS,
  RECEIVE_STUDENT_WORDS,
  ADD_STUDENT_WORDS
} from "../actions/actionTypes";

export default function studentWords(
  state = initialState.studentWords,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENT_WORDS:
      console.log("FETCH_WORDS Action");
      return action;
    case ADD_STUDENT_WORDS:
      newState = action.studentWords;
      console.log("ADD_STUDENT Action");
      return newState;
    case RECEIVE_STUDENT_WORDS:
      newState = action.studentWords;
      console.log("RECEIVE_STUDENT_WORDS Action");
      return newState;
    default:
      return state;
  }
}
