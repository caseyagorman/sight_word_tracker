import React from "react";

const WordPage = props => {
  return (
    <div>
      <div key={props.data.word_id}>
        <h1>{props.data[0].word}</h1>
        <br />
      </div>
      These students are learning <b>{props.data[0].word}</b>
    </div>
  );
};
export default WordPage;
