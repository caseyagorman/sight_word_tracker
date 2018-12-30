import React from "react";
import { Link } from "react-router-dom";

// Display links to words

const AllWordsTableRows = props => (
  <tbody>
    <tr>
      <td>
        <h4>
          <Link to={`/word-detail/${props.word_id}`}>{props.word}</Link>
        </h4>
      </td>
      <td>{props.count}</td>
    </tr>
  </tbody>
);

export default AllWordsTableRows;
