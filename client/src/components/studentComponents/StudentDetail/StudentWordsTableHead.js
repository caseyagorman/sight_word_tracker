import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudentWordsTableRows from "./StudentWordsTableRows";

// Display table head of words students are learning

class StudentWordsTableHead extends Component {
  displayTableHead(words, student) {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>{this.props.student.fname} is learning</th>
          </tr>
        </thead>
        {this.displayTableRows(words)}
      </Table>
    );
  }

  displayTableRows(words) {
    if (!words) {
      return <p>loading...</p>;
    }

    return words.map(words => StudentWordsTableRows(words));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.words, this.props.student)}</div>
      </div>
    );
  }
}

export default StudentWordsTableHead;
