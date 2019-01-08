import React from "react";
import { Link } from "react-router-dom";
import "../../../static/LetterStyle.css";
// Display links to words students are learning within table rows

const LetterDetailTableRows = props => (
  <tbody id="name-table">
    <tr>
      <td>
        <Link to={`/details/${props.student_id}`} className="link">
          {props.fname} {props.lname}
        </Link>
      </td>
    </tr>
  </tbody>
);

export default LetterDetailTableRows;
