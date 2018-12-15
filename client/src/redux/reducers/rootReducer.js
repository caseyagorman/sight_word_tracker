import { combineReducers } from "redux";
import students from "./studentsReducer";
import words from "./wordsReducer";

const rootReducer = combineReducers({
  students,
  words
});

export default rootReducer;
