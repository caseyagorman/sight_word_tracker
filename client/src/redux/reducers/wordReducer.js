import initialState from "./initialState";
import { FETCH_WORD, RECEIVE_WORD } from "../actions/actionTypes";

export default function word(state = initialState.word, action) {
  let newState;
  switch (action.type) {
    case FETCH_WORD:
      console.log("FETCH_WORD Action");
      return action;
    case RECEIVE_WORD:
      newState = action.word;
      console.log("RECEIVE_WORD Action");
      return newState;
    default:
      return state;
  }
}
