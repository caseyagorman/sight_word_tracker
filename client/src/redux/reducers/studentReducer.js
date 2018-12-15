import initialState from "./initialState";
import {
  CREATE_STUDENT,
  ADD_STUDENT,
  FETCH_STUDENT,
  RECEIVE_STUDENT
} from "../actions/actionTypes";

export default function student(state = initialState.student, action) {
  let newState;
  switch (action.type) {
    case CREATE_STUDENT:
      console.log("CREATE_STUDENT Action");
      return action;
    case ADD_STUDENT:
      newState = action.student;
      console.log("ADD_STUDENT Action");
      return newState;
    case FETCH_STUDENT:
      console.log("FETCH_STUDENT Action");
      return action;
    case RECEIVE_STUDENT:
      newState = action.student;
      console.log("RECEIVE_STUDENT Action");
      return newState;
    default:
      return state;
  }
}
