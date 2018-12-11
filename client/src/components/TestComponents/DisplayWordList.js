import React from "react";
const displayWords = props => {
  console.log(props);
  return props.map(props => <li>{props}</li>);
};

export default displayWords;
