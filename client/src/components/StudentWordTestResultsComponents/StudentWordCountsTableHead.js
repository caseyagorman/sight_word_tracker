import React, { Component } from "react";
import { Table } from "reactstrap";
import WordCountRows from "./WordCountRows";
class StudentWordCountsTableHead extends Component {
  displayTableHead(test) {
    return (
      <div>
        <h3> Word Counts</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Word</th>
              <th>Correct Count</th>
              <th>Incorrect Count</th>
            </tr>
          </thead>
          {this.displayTableRows(test)}
        </Table>
      </div>
    );
  }

  displayTableRows(test) {
    if (!test) {
      return <p>loading...</p>;
    }

    return test.map(test => WordCountRows(test));
  }

  render() {
    return <div>{this.displayTableHead(this.props.test)}</div>;
  }
}

export default StudentWordCountsTableHead;
