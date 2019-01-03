import initialState from "./initialState";
import {
  FETCH_UNKNOWN_LETTERS,
  RECEIVE_UNKNOWN_LETTERS
} from "../actions/actionTypes";

export default function unknownLetters(
  state = initialState.unknownLetters,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_UNKNOWN_LETTERS:
      console.log("FETCH_UNKNOWN_LETTERS Action");
      return action;
    case RECEIVE_UNKNOWN_LETTERS:
      newState = action.unknownLetters;
      console.log("RECEIVE_UNKNOWN_LETTERS Action");
      return newState;
    default:
      return state;
  }
}
