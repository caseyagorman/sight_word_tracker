import React from "react";
const testResults = props => {
  console.log(props);
  return (
    <div>
      <br />
      <div>test taken: {props.test_date}</div>
      <div>correct words: {props.correct_words}</div>
      <div>incorrect words: {props.incorrect_words}</div>
      <br />
    </div>
  );
};

export default testResults;
