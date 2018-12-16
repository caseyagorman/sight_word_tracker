import { combineReducers } from "redux";
import students from "./studentsReducer";
import student from "./studentReducer";
import words from "./wordsReducer";
import studentWords from "./studentWordsReducer";
import word from "./wordReducer";
import unknownWords from "./unknownWordsReducer";

const rootReducer = combineReducers({
  students,
  words,
  studentWords,
  student,
  word,
  unknownWords
});

export default rootReducer;
