import React from "react";
const SoundCountRows = props => {
  return (
    <tbody>
      <tr>
        <td>{props.sound}</td>
        <td>{props.correct_count}</td>
        <td>{props.incorrect_count}</td>
      </tr>
    </tbody>
  );
};

export default SoundCountRows;
