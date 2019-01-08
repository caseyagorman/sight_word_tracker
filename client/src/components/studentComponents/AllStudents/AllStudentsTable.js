import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../static/StudentStyle.css";
// Display table head of words students are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

class AllStudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { students: this.props.students };
    this.onSort = this.onSort.bind(this);
  }

  onSort(e, sortKey) {
    let myArray = this.state.students;
    myArray.sort(function(a, b) {
      return a[sortKey] < b[sortKey] ? 1 : a[sortKey] > b[sortKey] ? -1 : 0;
    });
    this.setState({ students: myArray });
  }

  render() {
    let students = this.state.students;

    return (
      <div id="#student-table">
        <Table bordered hover>
          <thead>
            <tr>
              <th onClick={e => this.onSort(e, "fname")}>Name</th>
              <th onClick={e => this.onSort(e, "links")}>Links</th>
              <th onClick={e => this.onSort(e, "word_count")}>Words</th>
              <th onClick={e => this.onSort(e, "unlearned_word_count")}>
                Unleared Words
              </th>
              <th onClick={e => this.onSort(e, "letter_count")}>Letters</th>
              <th onClick={e => this.onSort(e, "unlearned_letter_count")}>
                Unlearned Letters
              </th>
              <th onClick={e => this.onSort(e, "sound_count")}>Sounds</th>
              <th onClick={e => this.onSort(e, "unlearned_sound_count")}>
                Unlearned Sounds
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map(function(student) {
              return (
                <tr>
                  <td>
                    <th>
                      <h4>
                        {student.fname} {student.lname}
                      </h4>
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
                    <Link
                      to={`/details/${student.student_id}`}
                      className="link"
                    >
                      View dashboard
                    </Link>
                    <br />
                    <Link to={`/#/${student.student_id}`} className="link">
                      View reports
                    </Link>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {student.word_list.map(listElements)}
                    </ul>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {student.unlearned_word_list.map(listElements)}
                    </ul>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {student.letter_list.map(listElements)}
                    </ul>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {student.unlearned_letter_list.map(listElements)}
                    </ul>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {student.sound_list.map(listElements)}
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
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AllStudentsTable;
