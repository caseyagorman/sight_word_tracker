import { combineReducers } from "redux";
import students from "./studentsReducer";

const rootReducer = combineReducers({
  students
});

export default rootReducer;
