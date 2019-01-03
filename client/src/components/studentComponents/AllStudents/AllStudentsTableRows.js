import React from "react";
import { Link } from "react-router-dom";

// Display links to words students are learning within table rows

const AllStudentsTableRows = props => (
  <tbody>
    <tr>
      <td>
        <h4>
          <Link to={`/details/${props.student_id}`}>
            {props.fname} {props.lname}
          </Link>
        </h4>
      </td>
      <td>{props.word_count}</td>
      <td>{props.letter_count}</td>
    </tr>
  </tbody>
);

export default AllStudentsTableRows;
