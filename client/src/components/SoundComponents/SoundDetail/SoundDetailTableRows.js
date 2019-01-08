import React from "react";
import { Link } from "react-router-dom";
import "../../../static/SoundStyle.css";
// Display links to sounds students are learning within table rows
const tableStyle = {
  fontSize: "24px"
};
const SoundDetailTableRows = props => (
  <tbody>
    <tr>
      <td style={tableStyle}>
        <Link to={`/details/${props.student_id}`} id="link">
          {props.fname} {props.lname}
        </Link>
      </td>
    </tr>
  </tbody>
);

export default SoundDetailTableRows;
