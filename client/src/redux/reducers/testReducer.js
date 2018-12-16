import initialState from "./initialState";
import { ADD_TEST } from "../actions/actionTypes";

export default function test(state = initialState.test, action) {
  let newState;
  switch (action.type) {
    case ADD_TEST:
      newState = action.test;
      console.log("ADD_TEST Action");
      return newState;
    default:
      return state;
  }
}
