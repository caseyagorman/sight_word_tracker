import initialState from "./initialState";
import { FETCH_STUDENTS, RECEIVE_STUDENTS } from "../actions/actionTypes";

export default function students(state = initialState.students, action) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENTS:
      console.log("FETCH_STUDENTS Action");
      return action;
    case RECEIVE_STUDENTS:
      newState = action.stuff;
      console.log("RECEIVE_STUDENTS Action");
      return newState;
    default:
      return state;
  }
}
