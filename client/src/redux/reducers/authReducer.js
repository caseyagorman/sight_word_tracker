import initialState from "./initialState";
import { SET_USER, LOGOUT_USER } from "../actions/actionTypes";

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case SET_USER:
      console.log("auth Reducer session", sessionStorage);
      console.log("AUTH REDUCER", action.auth);
      if (sessionStorage.length > 0) {
        return Object.assign({}, state, {
          user: {
            username: sessionStorage.username,
            userId: sessionStorage.userId
          },
          isAuthenticated: true
        });
      }
      return Object.assign({}, state, {
        user: action.auth,
        isAuthenticated: true
      });
    default:
      return state;
  }
}
