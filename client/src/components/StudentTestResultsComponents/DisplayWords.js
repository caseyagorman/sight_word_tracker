import React from "react";
const displayWords = props => {
  return props.map(props => <div>{props}</div>);
};

export default displayWords;
