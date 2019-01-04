import React, { Component } from "react";
import { Table } from "reactstrap";
import AllWordsTableRows from "./AllWordsTableRows";

// Display table head of words words are learning

class AllWordsTableHead extends Component {
  displayTableHead(words) {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <th>
              <h4>Word</h4>
            </th>
            <th>
              <h4>Learning Count</h4>
            </th>
          </thead>
          {this.displayTableRows(words)}
        </Table>
      </div>
    );
  }

  displayTableRows(words) {
    if (!words) {
      return <p>loading...</p>;
    }

    return words.map(words => AllWordsTableRows(words));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.words)}</div>
      </div>
    );
  }
}

export default AllWordsTableHead;
