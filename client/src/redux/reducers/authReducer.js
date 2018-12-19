import initialState from "./initialState";
import { SET_USER, LOGOUT_USER } from "../actions/actionTypes";

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log("USER", action.user);
      return {
        user: action.user,
        isAuthenticated: true
      };
    case LOGOUT_USER:
      return {
        user: undefined,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
