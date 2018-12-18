import { combineReducers } from "redux";
import students from "./studentsReducer";
import student from "./studentReducer";
import words from "./wordsReducer";
import studentWords from "./studentWordsReducer";
import word from "./wordReducer";
import unknownWords from "./unknownWordsReducer";
import studentTestResults from "./studentTestResultsReducer";
import test from "./testReducer";
import user from "./authReducer";
import isAuthenticated from "./authReducer";

const rootReducer = combineReducers({
  students,
  words,
  studentWords,
  student,
  word,
  unknownWords,
  studentTestResults,
  test,
  user,
  isAuthenticated
});

export default rootReducer;
