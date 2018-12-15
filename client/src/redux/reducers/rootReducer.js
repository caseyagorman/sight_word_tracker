import { combineReducers } from "redux";
import students from "./studentsReducer";
import student from "./studentReducer";
import words from "./wordsReducer";
import studentWords from "./studentWordsReducer";

const rootReducer = combineReducers({
  students,
  words,
  studentWords,
  student
});

export default rootReducer;
