import initialState from "./initialState";
import { FETCH_WORDS, RECEIVE_WORDS } from "../actions/actionTypes";

export default function words(state = initialState.words, action) {
  switch (action.type) {
    case FETCH_WORDS:
      console.log("FETCH_WORDS Action");
      return action;
    case RECEIVE_WORDS:
      return Object.assign({}, state, {
        words: action.words
      });
    default:
      return state;
  }
}
