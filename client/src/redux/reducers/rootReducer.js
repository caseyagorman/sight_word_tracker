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
import unknownLetters from "./unknownLettersReducer";
import studentLetters from "./studentLettersReducer";
import studentLetterTestResults from "./studentLetterTestResultsReducer";
import unknownSounds from "./unknownSoundsReducer";
import studentSounds from "./studentSoundsReducer";
import studentSoundTestResults from "./studentSoundTestResultsReducer";
import sounds from "./soundsReducer";
import sound from "./soundReducer";

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
  letters,
  unknownLetters,
  studentLetters,
  studentLetterTestResults,
  unknownSounds,
  sounds,
  sound,
  studentSoundTestResults,
  studentSounds
});

export default rootReducer;
