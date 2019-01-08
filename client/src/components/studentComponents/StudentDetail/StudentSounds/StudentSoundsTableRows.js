import React from "react";
import { Link } from "react-router-dom";

// Display links to words students are learning within table rows
const tableStyle = {
  fontSize: "24px"
};
const StudentSoundsTableRows = props => (
  <tbody>
    <tr>
      <td style={tableStyle}>
        <Link to={`/sound-detail/${props.sound_id}`} className="link">
          {props.sound}
        </Link>
      </td>
    </tr>
  </tbody>
);

export default StudentSoundsTableRows;
