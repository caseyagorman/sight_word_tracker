import React, { Component } from "react";
import { Table, Col } from "reactstrap";
import WordCountRows from "./WordCountRows";
class StudentWordCountsTableHead extends Component {
  displayTableHead(test) {
    return (
      <Col lg="2">
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
      </Col>
    );
  }

  displayTableRows(test) {
    if (!test) {
      return <p>loading...</p>;
    }

    return test.map(test => WordCountRows(test));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.test)}</div>
      </div>
    );
  }
}

export default StudentWordCountsTableHead;
