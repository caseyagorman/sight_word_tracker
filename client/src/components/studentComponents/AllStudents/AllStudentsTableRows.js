import React from "react";
import { Link } from "react-router-dom";

// Display links to words students are learning within table rows

const AllStudentsTableRows = props => (
  <tbody>
    <tr>
      <td>
        <h4>
          {props.fname} {props.lname}
        </h4>
      </td>
      <td>
        <Link to={`/details/${props.student_id}`}>View dashboard</Link>
        <br />
        <Link to={`/#/${props.student_id}`}>View reports</Link>
      </td>
      <td>{props.word_count}</td>
      <td>{props.letter_count}</td>
    </tr>
  </tbody>
);

export default AllStudentsTableRows;
