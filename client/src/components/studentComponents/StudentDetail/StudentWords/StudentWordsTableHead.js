import React, { Component } from "react";
import { Table } from "reactstrap";
import StudentWordsTableRows from "./StudentWordsTableRows";
import "../../../../static/StudentStyle.css";
// Display table head of words students are learning

class StudentWordsTableHead extends Component {
  displayWordsTableHead(data) {
    return (
      <div>
        <Table bordered hover>
          <thead id="student-words-table-head">Words</thead>
          {this.displayWordsTableRows(data)}
        </Table>
      </div>
    );
  }

  displayWordsTableRows(data) {
    if (!data) {
      return <p>loading...</p>;
    }
    data = data[1];
    return data.map(data => StudentWordsTableRows(data));
  }

  render() {
    return (
      <div>
        <div>{this.displayWordsTableHead(this.props.data)}</div>
      </div>
    );
  }
}

export default StudentWordsTableHead;
