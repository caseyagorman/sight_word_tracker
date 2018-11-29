import React from "react";

const WordPage = props => {
  console.log(props);
  return <div key={props.data.word_id}>{props.data[0].word}</div>;
};
export default WordPage;
