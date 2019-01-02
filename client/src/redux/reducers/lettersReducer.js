import initialState from "./initialState";
import { FETCH_LETTERS, RECEIVE_LETTERS } from "../actions/actionTypes";

export default function words(state = initialState.letters, action) {
  switch (action.type) {
    case FETCH_LETTERS:
      return action;
    case RECEIVE_LETTERS:
      return Object.assign({}, state, {
        letters: action.letters
      });
    default:
      return state;
  }
}
