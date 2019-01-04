import initialState from "./initialState";
import {
  FETCH_SOUND,
  RECEIVE_SOUND,
  DELETE_SOUND,
  ADD_SOUND
} from "../actions/actionTypes";

export default function sound(state = initialState.sound, action) {
  let newState;
  switch (action.type) {
    case FETCH_SOUND:
      console.log("FETCH_SOUND Action");
      return action;
    case RECEIVE_SOUND:
      newState = action.sound;
      console.log("RECEIVE_SOUND Action");
      return newState;
    case DELETE_SOUND:
      newState = action.sound;
      console.log("DELETE_SOUND Action");
      return newState;
    case ADD_SOUND:
      newState = action.sound;
      console.log("ADD_SOUND Action");
      return newState;
    default:
      return state;
  }
}
