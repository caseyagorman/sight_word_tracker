import React from "react";

const WordPage = props => {
  return (
    <div>
      <div key={props.word_id}>
        <h1>{props[0].word}</h1>
        <br />
      </div>
      These students are learning <b>{props[0].word}</b>
    </div>
  );
};
export default WordPage;
