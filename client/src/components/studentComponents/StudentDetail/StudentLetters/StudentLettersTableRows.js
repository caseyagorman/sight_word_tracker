import React from "react";
import { Link } from "react-router-dom";

// Display links to words students are learning within table rows
const tableStyle = {
  fontSize: "24px"
};
const StudentLettersTableRows = props => (
  <tbody>
    <tr>
      <td style={tableStyle}>
        <Link to={`/letter-detail/${props.letter_id}`} className="link">
          {props.letter}
        </Link>
      </td>
    </tr>
  </tbody>
);

export default StudentLettersTableRows;
