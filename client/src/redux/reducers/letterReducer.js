import initialState from "./initialState";
import {
  FETCH_LETTER,
  RECEIVE_LETTER,
  DELETE_LETTER,
  ADD_LETTER
} from "../actions/actionTypes";

export default function word(state = initialState.letter, action) {
  let newState;
  switch (action.type) {
    case FETCH_LETTER:
      console.log("FETCH_LETTER Action");
      return action;
    case RECEIVE_LETTER:
      newState = action.letter;
      console.log("RECEIVE_LETTER Action");
      return newState;
    case DELETE_LETTER:
      newState = action.word;
      console.log("DELETE_LETTER Action");
      return newState;
    case ADD_LETTER:
      newState = action.word;
      console.log("ADD_LETTER Action");
      return newState;
    default:
      return state;
  }
}
