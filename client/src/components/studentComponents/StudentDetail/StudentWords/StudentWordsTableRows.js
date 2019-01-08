import React from "react";
import { Link } from "react-router-dom";

// Display links to words students are learning within table rows
const tableStyle = {
  fontSize: "24px"
};
const StudentWordsTableRows = props => (
  <tbody>
    <tr>
      <td style={tableStyle}>
        <Link to={`/word-detail/${props.word_id}`} className="link">
          {props.word}
        </Link>
      </td>
    </tr>
  </tbody>
);

export default StudentWordsTableRows;
