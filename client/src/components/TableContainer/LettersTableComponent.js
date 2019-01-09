import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
// import "../../static/LetterStyle.css";
import DeleteLetter from "../LetterComponents/Forms/DeleteLetter";
import { Glyphicon } from "react-bootstrap";
// Display table head of words letters are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

const LettersTableComponent = (letters, onSort, token) => (
  // console.log("LETTERS", letters);
  <div className="letter-table">
    <Table bordered hover>
      <thead>
        <tr>
          <th onClick={e => onSort(e, "letter")}>Letter</th>
          <th onClick={e => onSort(e, "count")}>Learned</th>
          <th onClick={e => onSort(e, "unlearned_count")}>Unlearned</th>
        </tr>
      </thead>
      <tbody>
        {letters.map(function(letter) {
          return (
            <tr>
              <td>
                <Link
                  to={`/letter-detail/${letter.letter_id}`}
                  className="link"
                >
                  <h2 id="letter-name-table-header">{letter.letter}</h2>
                </Link>
                <DeleteLetter token={token} letterAlt={letter} />
              </td>
              <td>
                <ul style={noBulletList}>
                  {letter.students.map(listElements)}
                </ul>
              </td>
              <td>
                <ul style={noBulletList}>
                  {letter.unlearned_students.map(listElements)}
                </ul>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colspan="8">
            <a href="/add-letter" className="link">
              + Click to add new letter
            </a>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default LettersTableComponent;
