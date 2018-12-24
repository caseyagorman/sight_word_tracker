import React from "react";
import { Link } from "react-router-dom";

const StudentWordsPage = props => (
  <tbody>
    <tr>
      <td>
        <Link to={`/word-detail/${props.word_id}`}>{props.word}</Link>
      </td>
    </tr>
  </tbody>
);

export default StudentWordsPage;
