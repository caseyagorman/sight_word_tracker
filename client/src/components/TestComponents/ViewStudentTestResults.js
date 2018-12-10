import React from "react";
const testResults = props => {
  console.log(props);
  return (
    <div>
      <div>{props.data[0].test_date}</div>
      correct words: {props.data[0].correct_words}
    </div>
  );
};

export default testResults;
