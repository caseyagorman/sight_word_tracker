import initialState from "./initialState";
import { SET_USER, LOGOUT_USER } from "../actions/actionTypes";

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case SET_USER:
      console.log("AUTH REDUCER", action.auth);
      console.log("STATE", state);
      return Object.assign({}, state, {
        user: action.auth,
        isAuthenticated: true
      });
    case LOGOUT_USER:
      return {
        user: undefined,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
