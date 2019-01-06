import initialState from "./initialState";
import {
  FETCH_UNKNOWN_WORD_STUDENTS,
  RECEIVE_UNKNOWN_WORD_STUDENTS
} from "../actions/actionTypes";

export default function unknownWordStudents(
  state = initialState.unknownWordStudents,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_UNKNOWN_WORD_STUDENTS:
      console.log("FETCH_UNKNOWN_WORD_STUDENTS Action");
      return action;
    case RECEIVE_UNKNOWN_WORD_STUDENTS:
      newState = action.unknownWordStudents;
      console.log("RECEIVE_UNKNOWN_WORD_STUDENTS Action");
      return newState;
    default:
      return state;
  }
}
