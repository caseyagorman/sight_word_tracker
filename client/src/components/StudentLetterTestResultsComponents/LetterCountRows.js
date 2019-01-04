import React from "react";
const LetterCountRows = props => {
  return (
    <tbody>
      <tr>
        <td>{props.letter}</td>
        <td>{props.correct_count}</td>
        <td>{props.incorrect_count}</td>
      </tr>
    </tbody>
  );
};

export default LetterCountRows;
