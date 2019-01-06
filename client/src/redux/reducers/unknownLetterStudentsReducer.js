import initialState from "./initialState";
import {
  FETCH_UNKNOWN_LETTER_STUDENTS,
  RECEIVE_UNKNOWN_LETTER_STUDENTS
} from "../actions/actionTypes";

export default function unknownLetterStudents(
  state = initialState.unknownLetterStudents,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_UNKNOWN_LETTER_STUDENTS:
      console.log("FETCH_UNKNOWN_LETTER_STUDENTS Action");
      return action;
    case RECEIVE_UNKNOWN_LETTER_STUDENTS:
      newState = action.unknownLetterStudents;
      console.log("RECEIVE_UNKNOWN_WORD_STUDENTS Action");
      return newState;
    default:
      return state;
  }
}
