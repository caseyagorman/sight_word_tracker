import React from "react";

const WordPage = props => {
  return (
    <div key={props.data.word_id}>
      <h1>{props.data[0].word}</h1>
    </div>
  );
};
export default WordPage;
