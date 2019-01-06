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
              <h4>Letter</h4>
            </th>
            <th>
              <h4>Learned</h4>
            </th>
            <th>
              <h4>Learning</h4>
            </th>
          </thead>
          {this.displayTableRows(letters)}
        </Table>
      </div>
    );
  }

  displayTableRows(letters) {
    console.log(letters);
    if (!letters) {
      return <p>sploading...</p>;
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
