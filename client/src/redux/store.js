import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createStore } from "redux";

const store = createStore((state = {}) => state, applyMiddleware(thunk));
export default store;
