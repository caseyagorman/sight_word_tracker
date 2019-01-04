import initialState from "./initialState";
import {
  FETCH_UNKNOWN_SOUNDS,
  RECEIVE_UNKNOWN_SOUNDS
} from "../actions/actionTypes";

export default function unknownSounds(
  state = initialState.unknownSounds,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_UNKNOWN_SOUNDS:
      console.log("FETCH_UNKNOWN_SOUNDS Action");
      return action;
    case RECEIVE_UNKNOWN_SOUNDS:
      newState = action.unknownSounds;
      console.log("RECEIVE_UNKNOWN_SOUNDS Action");
      return newState;
    default:
      return state;
  }
}
