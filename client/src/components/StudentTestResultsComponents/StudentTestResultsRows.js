import React from "react";
import DisplayWords from "./DisplayWords";
const StudentTestResultsRow = props => {
  console.log("studenttestresultsrow", props);
  return (
    <tbody>
      <tr>
        <td>{props.test_date}</td>
        <td>{props.score}</td>
        <td>{DisplayWords(props.correct_words)}</td>
        <td>{DisplayWords(props.incorrect_words)}</td>
      </tr>
    </tbody>
  );
};

export default StudentTestResultsRow;
