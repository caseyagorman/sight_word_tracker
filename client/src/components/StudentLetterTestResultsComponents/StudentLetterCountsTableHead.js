import React, { Component } from "react";
import { Table } from "reactstrap";
import LetterCountRows from "./LetterCountRows";
class StudentLetterCountsTableHead extends Component {
  displayTableHead(test) {
    return (
      <div>
        <h3> Letter Counts</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Letter</th>
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

    return test.map(test => LetterCountRows(test));
  }

  render() {
    return <div>{this.displayTableHead(this.props.test)}</div>;
  }
}

export default StudentLetterCountsTableHead;
