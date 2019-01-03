import initialState from "./initialState";
import {
  FETCH_STUDENT_LETTERS,
  RECEIVE_STUDENT_LETTERS,
  ADD_STUDENT_LETTERS
} from "../actions/actionTypes";

export default function studentLetters(
  state = initialState.studentLetters,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENT_LETTERS:
      console.log("FETCH_LETTERS Action");
      return action;
    case ADD_STUDENT_LETTERS:
      newState = action.studentLetters;
      console.log("ADD_STUDENT Action");
      return newState;
    case RECEIVE_STUDENT_LETTERS:
      newState = action.studentLetters;
      console.log("RECEIVE_STUDENT_LETTERS Action");
      return newState;
    default:
      return state;
  }
}
