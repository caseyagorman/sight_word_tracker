import React from "react";
import DisplayWords from "./DisplayWords";
const ViewStudentTestResults = props => {
  console.log("test results", props.correct_words);
  return (
    <div>
      <br />
      <div>test taken: {props.test_date}</div>
      <div>score: {props.score}</div>
      <div>correct words: {DisplayWords(props.correct_words)}</div>
      <div>incorrect words: {DisplayWords(props.incorrect_words)}</div>

      <br />
    </div>
  );
};

export default ViewStudentTestResults;
