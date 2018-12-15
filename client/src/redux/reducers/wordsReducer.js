import initialState from "./initialState";
import { FETCH_WORDS, RECEIVE_WORDS } from "../actions/actionTypes";

export default function words(state = initialState.words, action) {
  let newState;
  console.log("new state", newState);
  switch (action.type) {
    case FETCH_WORDS:
      console.log("FETCH_WORDS Action");
      console.log("action", action);
      return action;
    case RECEIVE_WORDS:
      newState = action.words;
      console.log("action", action);
      console.log("new state", newState);
      console.log("RECEIVE_WORDS Action");
      return newState;
    default:
      return state;
  }
}
