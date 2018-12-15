import { combineReducers } from "redux";
import students from "./studentsReducer";
import words from "./wordsReducer";
import studentWords from "./studentWordsReducer";

const rootReducer = combineReducers({
  students,
  words,
  studentWords
});

export default rootReducer;
