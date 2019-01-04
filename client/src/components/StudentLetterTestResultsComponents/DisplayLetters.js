import React from "react";
const displayLetters = props => {
  return props.map(props => <div>{props}</div>);
};

export default displayLetters;
