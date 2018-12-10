import React from "react";
import DisplayWords from "./DisplayWordList";
const testResults = props => {
  console.log("PROPS", props);
  return (
    <div>
      <br />
      <div>test taken: {props.test_date}</div>
      <div>score: {props.score}%</div>
      <div>correct words: {DisplayWords(props.correct_words)}</div>
      <div>incorrect words: {DisplayWords(props.incorrect_words)}</div>

      <br />
    </div>
  );
};

export default testResults;
