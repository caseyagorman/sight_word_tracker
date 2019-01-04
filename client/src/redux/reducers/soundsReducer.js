import initialState from "./initialState";
import { FETCH_SOUNDS, RECEIVE_SOUNDS } from "../actions/actionTypes";

export default function sounds(state = initialState.sounds, action) {
  switch (action.type) {
    case FETCH_SOUNDS:
      console.log("FETCH_SOUNDS Action");
      return action;
    case RECEIVE_SOUNDS:
      return Object.assign({}, state, {
        sounds: action.sounds
      });
    default:
      return state;
  }
}
