import React from "react";
import DisplayLetters from "./DisplayLetters";
const StudentLetterTestResultsRow = props => {
  return (
    <tbody>
      <tr>
        <td>{props.test_date}</td>
        <td>{props.score}</td>
        <td>{DisplayLetters(props.correct_letters)}</td>
        <td>{DisplayLetters(props.incorrect_letters)}</td>
      </tr>
    </tbody>
  );
};

export default StudentLetterTestResultsRow;
