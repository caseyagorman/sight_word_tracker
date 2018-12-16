import initialState from "./initialState";
import {
  ADD_STUDENT,
  FETCH_STUDENT,
  RECEIVE_STUDENT,
  ADD_STUDENT_WORDS
} from "../actions/actionTypes";

export default function student(state = initialState.student, action) {
  let newState;
  switch (action.type) {
    case ADD_STUDENT:
      newState = action.student;
      console.log("ADD_STUDENT Action");
      return newState;
    case FETCH_STUDENT:
      console.log("FETCH_STUDENT Action");
      return action;
    case ADD_STUDENT_WORDS:
      newState = action.student;
      console.log("ADD_STUDENT_WORDS Action");
      return newState;
    case RECEIVE_STUDENT:
      newState = action.student;
      console.log("RECEIVE_STUDENT Action");
      return newState;
    default:
      return state;
  }
}
