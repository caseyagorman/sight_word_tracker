import React, { Component } from "react";
import { Table } from "reactstrap";
import StudentWordsTableRows from "./StudentWordsTableRows";

// Display table head of words students are learning

class StudentWordsTableHead extends Component {
  displayTableHead(words, student) {
    return (
      <div>
        <h3>{this.props.student.fname} is learning</h3>
        <Table striped bordered condensed hover>
          {this.displayTableRows(words)}
        </Table>
      </div>
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
