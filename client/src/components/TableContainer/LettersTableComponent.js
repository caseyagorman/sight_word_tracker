import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
// import "../../../static/StudentStyle.css";
// Display table head of words students are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

const LettersTableComponent = (letters, onSort) => (
  <div id="letter-table">
    <Table bordered hover>
      <thead>
        <tr>
          <th>Letter</th>
          <th onClick={e => onSort(e, "count")}>Learned</th>
          <th onClick={e => onSort(e, "unlearned_count")}>Learning</th>
        </tr>
      </thead>
      <tbody>
        {letters.map(function(letter) {
          return (
            <tr>
              <td>
                <th>
                  <h1>
                    <Link
                      to={`/letter-detail/${letter.letter_id}`}
                      className="link"
                    >
                      {letter.letter}
                    </Link>
                  </h1>
                </th>
                <tr>
                  <td>
                    <h5>Learned |</h5> <span />
                    {letter.count}
                  </td>

                  <td>
                    <h5> Unlearned</h5>
                    {letter.unlearned_count}
                  </td>
                </tr>
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
      </tbody>
    </Table>
  </div>
);

export default LettersTableComponent;
