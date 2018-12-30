import initialState from "./initialState";
import {
  SET_USER,
  LOGIN_ERROR,
  CLEAR_ERRORS,
  LOGOUT_USER
} from "../actions/actionTypes";

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case SET_USER:
      console.log("SET USER", action.auth);
      return Object.assign({}, state, {
        user: action.auth,
        isAuthenticated: true
      });
    case LOGIN_ERROR:
      console.log("LOGIN ERROR", action.auth);
      return Object.assign({}, state, {
        user: {
          username: "",
          userId: ""
        },
        isAuthenticated: false,
        loginError: action.auth
      });
    case CLEAR_ERRORS:
      console.log("CLEAR ERRORS");
      return Object.assign({}, state, {
        user: {
          username: "",
          userId: ""
        },
        isAuthenticated: false,
        loginError: ""
      });
    case LOGOUT_USER:
      console.log("LOGOUT USER");
      return Object.assign({}, state, {
        user: {
          username: "",
          userId: ""
        },
        isAuthenticated: false,
        loginError: ""
      });

    default:
      return state;
  }
}
