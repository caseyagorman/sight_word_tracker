import initialState from "./initialState";
import { ADD_USER } from "../actions/actionTypes";

export default function user(state = initialState.user, action) {
  let newState;
  switch (action.type) {
    case ADD_USER:
      newState = action.user;
      console.log("ADD_USER Action");
      return newState;
    default:
      return state;
  }
}
