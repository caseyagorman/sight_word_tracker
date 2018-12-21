import initialState from "./initialState";
import { SET_USER, LOGOUT_USER } from "../actions/actionTypes";

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case SET_USER:
      console.log("AUTH REDUCER", action.auth);
      return Object.assign({}, state, {
        user: action.auth,
        isAuthenticated: true
      });
    default:
      return state;
  }
}
