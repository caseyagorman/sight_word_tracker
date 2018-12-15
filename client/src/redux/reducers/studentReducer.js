import initialState from "./initialState";
import { CREATE_STUDENT } from "../actions/actionTypes";

export default function student(state = initialState.student, action) {
  let newState;
  switch (action.type) {
    case CREATE_STUDENT:
      console.log("CREATE_STUDENT Action");
      return action;
    default:
      return state;
  }
}
