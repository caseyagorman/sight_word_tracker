import React from "react";
import DisplaySounds from "./DisplaySounds";
const StudentWordTestResultsRows = props => {
  return (
    <tbody>
      <tr>
        <td>{props.test_date}</td>
        <td>{props.score}</td>
        <td>{DisplaySounds(props.correct_sounds)}</td>
        <td>{DisplaySounds(props.incorrect_sounds)}</td>
      </tr>
    </tbody>
  );
};

export default StudentWordTestResultsRows;
