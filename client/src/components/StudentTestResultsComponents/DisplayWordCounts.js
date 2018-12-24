import React, { Component } from "react";
import { Table } from "react-bootstrap";
import WordCountRows from "./WordCountRows";
class DisplayWordCounts extends Component {
  displayTableHead(test) {
    return (
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

export default DisplayWordCounts;
