import React from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";

// Display links to words students are learning within table rows

const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

const AllStudentsTableRows = props => (
  <tbody>
    <tr>
      <td>
        <th>
          <h4>
            {props.fname} {props.lname}{" "}
          </h4>
        </th>
        <tr>
          <td>
            <h5>Learned</h5>
            words: {props.word_count}
            <br />
            letters: {props.letter_count}
            <br />
            sounds: {props.sound_count}
          </td>
          <td>
            <h5>Unlearned</h5>
            words: {props.unlearned_word_count}
            <br />
            letters: {props.unlearned_letter_count}
            <br />
            sounds: {props.unlearned_sound_count}
          </td>
        </tr>
      </td>
      <td>
        <Link to={`/details/${props.student_id}`}>View dashboard</Link>
        <br />
        <Link to={`/#/${props.student_id}`}>View reports</Link>
      </td>
      <td>
        <ul style={noBulletList}>{props.word_list.map(listElements)}</ul>
      </td>
      <td>
        <ul style={noBulletList}>
          {props.unlearned_word_list.map(listElements)}
        </ul>
      </td>
      <td>
        <ul style={noBulletList}>{props.letter_list.map(listElements)}</ul>
      </td>
      <td>
        <ul style={noBulletList}>
          {props.unlearned_letter_list.map(listElements)}
        </ul>
      </td>
      <td>
        <ul style={noBulletList}>{props.sound_list.map(listElements)}</ul>
      </td>
      <td>
        <ul style={noBulletList}>
          {props.unlearned_sound_list.map(listElements)}
        </ul>
      </td>
    </tr>
  </tbody>
);

export default AllStudentsTableRows;
