import React from "react";
const displayWords = props => {
  return props.map(props => <li>{props}</li>);
};

export default displayWords;
