import initialState from "./initialState";
import { VERIFY_USER } from "../actions/actionTypes";

export default function user(state = initialState.loggedIn, action) {
  switch (action.type) {
    case VERIFY_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
