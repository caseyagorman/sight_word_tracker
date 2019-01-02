import React from "react";
import { Link } from "react-router-dom";

// Display links to words

const AllLettersTableRows = props => (
  <tbody>
    <tr>
      <td>
        <h4>
          <Link to={`/word-detail/${props.letter_id}`}>{props.letter}</Link>
        </h4>
      </td>
      <td>{props.count}</td>
    </tr>
  </tbody>
);

export default AllLettersTableRows;
