import React from "react";
// import { Link } from "react-router-dom";

const StudentWordsPage = props => (
  <div key={props.word_id}>
    <li>{props.word}</li>
  </div>
);

export default StudentWordsPage;
