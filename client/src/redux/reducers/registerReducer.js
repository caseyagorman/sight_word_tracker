import initialState from "./initialState";
import { REGISTER_ERROR, REGISTER_USER } from "../actions/actionTypes";

export default function auth(state = initialState.newUser, action) {
  switch (action.type) {
    case REGISTER_USER:
      console.log("REGISTER USER", action.newUser);
      return Object.assign({}, state, {
        newUser: action.newUser,
        error: ""
      });
    case REGISTER_ERROR:
      console.log("REGISTER ERROR", action.newUser);
      return Object.assign({}, state, {
        newUser: "",
        error: action.newUser
      });
    default:
      return state;
  }
}
