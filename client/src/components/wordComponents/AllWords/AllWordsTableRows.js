import React from "react";
import { Link } from "react-router-dom";

// Display links to words
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;
const AllWordsTableRows = props => (
  <tbody>
    <tr>
      <td>
        <th>
          <h4>
            <Link to={`/word-detail/${props.word_id}`}>{props.word}</Link>
          </h4>
        </th>
        <tr>
          <td>
            <h5>Learned |</h5> <span />
            {props.count}
          </td>

          <td>
            <h5> Unlearned</h5>
            {props.unlearned_count}
          </td>
        </tr>
      </td>
      <td>
        <ul style={noBulletList}>{props.students.map(listElements)}</ul>
      </td>
      <td>
        <ul style={noBulletList}>
          {props.unlearned_students.map(listElements)}
        </ul>
      </td>
    </tr>
  </tbody>
);

export default AllWordsTableRows;
