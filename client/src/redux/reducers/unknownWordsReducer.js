import initialState from "./initialState";
import {
  FETCH_UNKNOWN_WORDS,
  RECEIVE_UNKNOWN_WORDS
} from "../actions/actionTypes";

export default function unknownWords(
  state = initialState.unknownWords,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_UNKNOWN_WORDS:
      console.log("FETCH_UNKNOWN_WORDS Action");
      return action;
    case RECEIVE_UNKNOWN_WORDS:
      newState = action.unknownWords;
      console.log("RECEIVE_UNKNOWN_WORDS Action");
      return newState;
    default:
      return state;
  }
}
