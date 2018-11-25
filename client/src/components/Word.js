import React from "react";

const Word = props => (
  <div key={props.word_id}>
    <li>{props.word}</li>
  </div>
);

export default Word;
