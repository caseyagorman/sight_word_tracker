import initialState from "./initialState";
import { VERIFY_USER } from "../actions/actionTypes";

export default function au(state = initialState.loggedIn, action) {
  switch (action.type) {
    case VERIFY_USER:
      return {
        ...state,
        authUser: action.authUser,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
