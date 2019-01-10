import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import "../../static/StudentStyle.css";
import { Glyphicon } from "react-bootstrap";
import DeleteStudent from "../StudentComponents/Forms/StudentForms/DeleteStudent";

// Display table head of words students are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

const StudentTableComponent = (students, onSort, token) => (
  <div className="student-table">
    <Table bordered hover>
      <thead>
        <tr>
          <th id="student-table-header" colspan="2">
            Students
          </th>

          <th id="student-table-header" colspan="3">
            Learned{" "}
          </th>
          <th id="student-table-header" colspan="3">
            Unlearned{" "}
          </th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th onClick={e => onSort(e, "fname")}>Name</th>
          <th onClick={e => onSort(e, "links")}>Links</th>
          <th onClick={e => onSort(e, "word_count")}>Words</th>
          <th onClick={e => onSort(e, "letter_count")}>Letters</th>
          <th onClick={e => onSort(e, "sound_count")}>Sounds</th>
          <th onClick={e => onSort(e, "unlearned_word_count")}>Words</th>
          <th onClick={e => onSort(e, "unlearned_letter_count")}>Letters</th>
          <th onClick={e => onSort(e, "unlearned_sound_count")}>Sounds</th>
        </tr>
      </thead>
      <tbody>
        {students.map(function(student) {
          return (
            <tr>
              <td>
                <th>
                  <Link to={`/details/${student.student_id}`} className="link">
                    <h2 id="student-name-table-header">
                      {student.fname} {student.lname}
                    </h2>
                  </Link>
                  <DeleteStudent token={token} studentId={student.student_id} />
                </th>
                <tr>
                  <td>
                    <h5>Learned</h5>
                    words: {student.word_count}
                    <br />
                    letters: {student.letter_count}
                    <br />
                    sounds: {student.sound_count}
                  </td>
                  <td>
                    <h5>Unlearned</h5>
                    words: {student.unlearned_word_count}
                    <br />
                    letters: {student.unlearned_letter_count}
                    <br />
                    sounds: {student.unlearned_sound_count}
                  </td>
                </tr>
              </td>
              <td>
                <Link to={`/details/${student.student_id}`} className="link">
                  <Glyphicon
                    glyph="glyphicon glyphicon-dashboard"
                    id="dashboard"
                  />
                </Link>
                <br />
                <Link to={`/#/${student.student_id}`} className="link">
                  <Glyphicon glyph="glyphicon glyphicon-book" id="book" />
                </Link>
              </td>
              <td>
                <ul style={noBulletList}>
                  {student.word_list.map(listElements)}
                </ul>
              </td>
              <td>
                <ul style={noBulletList}>
                  {student.letter_list.map(listElements)}
                </ul>
              </td>
              <td>
                <ul style={noBulletList}>
                  {student.sound_list.map(listElements)}
                </ul>
              </td>
              <td>
                <ul style={noBulletList}>
                  {student.unlearned_word_list.map(listElements)}
                </ul>
              </td>

              <td>
                <ul style={noBulletList}>
                  {student.unlearned_letter_list.map(listElements)}
                </ul>
              </td>

              <td>
                <ul style={noBulletList}>
                  {student.unlearned_sound_list.map(listElements)}
                </ul>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colspan="8">
            <a href="/add-student" className="link">
              + Click to add new student
            </a>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default StudentTableComponent;
