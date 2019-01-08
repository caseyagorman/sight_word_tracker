import React from "react";
import { Link } from "react-router-dom";
import "../../../static/SoundStyle.css";
// Display links to sounds students are learning within table rows

const SoundDetailTableRows = props => (
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

export default SoundDetailTableRows;
