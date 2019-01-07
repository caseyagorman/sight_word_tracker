import initialState from "./initialState";
import {
  FETCH_UNKNOWN_SOUND_STUDENTS,
  RECEIVE_UNKNOWN_SOUND_STUDENTS
} from "../actions/actionTypes";

export default function unknownSoundStudents(
  state = initialState.unknownSoundStudents,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_UNKNOWN_SOUND_STUDENTS:
      console.log("FETCH_UNKNOWN_SOUND_STUDENTS Action");
      return action;
    case RECEIVE_UNKNOWN_SOUND_STUDENTS:
      newState = action.unknownSoundStudents;
      console.log("RECEIVE_UNKNOWN_SOUND_STUDENTS Action", newState);
      return newState;
    default:
      return state;
  }
}
