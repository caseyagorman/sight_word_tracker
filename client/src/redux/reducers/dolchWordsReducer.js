import initialState from "./initialState";
import {
  FETCH_DOLCH_WORDS,
  RECEIVE_DOLCH_WORDS
} from "../actions/actionTypes";

export default function dolchWords(
  state = initialState.dolchWords,
  action
) {
  let newState;
  switch (action.type) {
    case FETCH_DOLCH_WORDS:
      console.log("FETCH_DOLCH_WORDS Action");
      return action;
    case RECEIVE_DOLCH_WORDS:
      newState = action.dolchWords;
      console.log("RECEIVE_DOLCH_WORDS Action");
      return newState;
    default:
      return state;
  }
}