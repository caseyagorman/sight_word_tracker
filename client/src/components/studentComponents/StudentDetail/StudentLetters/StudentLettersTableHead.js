import React, { Component } from "react";
import { Table } from "reactstrap";
import StudentLettersTableRows from "./StudentLettersTableRows";
import "../../../../static/StudentStyle.css";
// Display table head of words students are learning

class StudentLettersTableHead extends Component {
  displayLettersTableHead(data) {
    return (
      <div>
        <Table bordered condensed hover>
          <thead id="student-letter-table-head">Letters</thead>
          {this.displayLettersTableRows(data)}
        </Table>
      </div>
    );
  }

  displayLettersTableRows(data) {
    if (!data) {
      return <p>loading...</p>;
    }
    data = data[2];
    return data.map(data => StudentLettersTableRows(data));
  }

  render() {
    return (
      <div>
        <div>{this.displayLettersTableHead(this.props.data)}</div>
      </div>
    );
  }
}

export default StudentLettersTableHead;
