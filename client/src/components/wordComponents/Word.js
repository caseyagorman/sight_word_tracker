import React from "react";
import { Link } from "react-router-dom";

const Word = props => (
  <div key={props.word_id}>
    <li>
      <Link to={`/word-detail/${props.word_id}`}>{props.word}</Link>
    </li>
  </div>
);

export default Word;
