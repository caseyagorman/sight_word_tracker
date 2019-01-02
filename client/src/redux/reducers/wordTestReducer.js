import initialState from "./initialState";
import { ADD_WORD_TEST } from "../actions/actionTypes";

export default function wordTest(state = initialState.wordTest, action) {
  let newState;
  switch (action.type) {
    case ADD_WORD_TEST:
      newState = action.test;
      console.log("ADD_WORD_TEST Action");
      return newState;
    default:
      return state;
  }
}
