import React from "react";
import { Table } from "react-bootstrap";
const WordCounts = props => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Word</th>
          <th>Correct Count</th>
          <th>Incorrect Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.word}</td>
          <td>{props.correct_count}</td>
          <td>{props.incorrect_count}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default WordCounts;
