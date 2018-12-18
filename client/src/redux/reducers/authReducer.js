import initialState from "./initialState";
import { SET_USER, LOGOUT_USER } from "../actions/actionTypes";

export default function auth(state = initialState.isAuthenticated, action) {
  switch (action.type) {
    case SET_USER:
      console.log("USER", action.user);
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: undefined,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
