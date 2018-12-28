import React from "react";
import { Link } from "react-router-dom";

// Display links to words students are learning within table rows

const StudentWordsTableRows = props => (
  <tbody>
    <tr>
      <td>
        <Link to={`/word-detail/${props.word_id}`}>{props.word}</Link>
      </td>
    </tr>
  </tbody>
);

export default StudentWordsTableRows;
