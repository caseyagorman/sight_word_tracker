import React, { Component } from "react";
import { Table } from "reactstrap";
import AllLettersTableRows from "./AllLettersTableRows";

// Display table head of letters students are learning

class AllLettersTableHead extends Component {
  displayTableHead(letters) {
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
          {this.displayTableRows(letters)}
        </Table>
      </div>
    );
  }

  displayTableRows(letters) {
    if (!letters) {
      return <p>loading...</p>;
    }

    return letters.map(letters => AllLettersTableRows(letters));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.letters)}</div>
      </div>
    );
  }
}

export default AllLettersTableHead;
