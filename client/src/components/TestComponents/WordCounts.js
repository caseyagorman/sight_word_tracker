import React from "react";
const WordCounts = props => {
  return (
    <div>
      |{props.word} |+ {props.correct_count}|- {props.incorrect_count}
    </div>
  );
};

export default WordCounts;
