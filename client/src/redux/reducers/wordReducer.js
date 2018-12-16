import initialState from "./initialState";
import {
  FETCH_WORD,
  RECEIVE_WORD,
  DELETE_WORD,
  ADD_WORD
} from "../actions/actionTypes";

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
    case DELETE_WORD:
      newState = action.word;
      console.log("DELETE_WORD Action");
      return newState;
    case ADD_WORD:
      newState = action.word;
      console.log("ADD_WORD Action");
      return newState;
    default:
      return state;
  }
}
