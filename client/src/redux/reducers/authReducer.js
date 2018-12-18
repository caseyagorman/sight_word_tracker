import initialState from "./initialState";
import { VERIFY_USER } from "../actions/actionTypes";

export default function auth(state = initialState.isAuthenticated, action) {
  switch (action.type) {
    case VERIFY_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    default:
      return state;
  }
}
