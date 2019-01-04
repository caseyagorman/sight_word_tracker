import initialState from "./initialState";
import {
  FETCH_STUDENT_SOUNDS,
  RECEIVE_STUDENT_SOUNDS,
  ADD_STUDENT_SOUNDS
} from "../actions/actionTypes";

export default function studentSounds(
  state = initialState.studentSounds,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_STUDENT_SOUNDS:
      console.log("FETCH_SOUNDS Action");
      return action;
    case ADD_STUDENT_SOUNDS:
      newState = action.studentSounds;
      console.log("ADD_STUDENT_SOUNDS Action");
      return newState;
    case RECEIVE_STUDENT_SOUNDS:
      newState = action.studentSounds;
      console.log("RECEIVE_STUDENT_SOUNDS Action");
      return newState;
    default:
      return state;
  }
}
