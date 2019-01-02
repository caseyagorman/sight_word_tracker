import { combineReducers } from "redux";
import students from "./studentsReducer";
import student from "./studentReducer";
import words from "./wordsReducer";
import studentWords from "./studentWordsReducer";
import word from "./wordReducer";
import unknownWords from "./unknownWordsReducer";
import studentWordTestResults from "./studentWordTestResultsReducer";
import wordTest from "./wordTestReducer";
import auth from "./authReducer";
import register from "./registerReducer";
import letters from "./lettersReducer";
import letter from "./letterReducer";

const rootReducer = combineReducers({
  students,
  words,
  studentWords,
  student,
  word,
  unknownWords,
  studentWordTestResults,
  wordTest,
  auth,
  register,
  letter,
  letters
});

export default rootReducer;
