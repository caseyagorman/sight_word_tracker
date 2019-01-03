import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";
import StudentWordsTableRows from "./StudentWordsTableRows";

// Display table head of words students are learning

class StudentWordsTableHead extends Component {
  displayWordsTableHead(data) {
    console.log("display table head", data);
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <th>
              <h4>Words</h4>
            </th>
          </thead>
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
