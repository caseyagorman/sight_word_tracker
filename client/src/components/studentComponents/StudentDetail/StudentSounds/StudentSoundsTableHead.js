import React, { Component } from "react";
import { Table } from "reactstrap";
import StudentSoundsTableRows from "./StudentSoundsTableRows";

// Display table head of Sounds students are learning

class StudentSoundsTableHead extends Component {
  displaySoundsTableHead(data) {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <th>
              <h4>Sounds</h4>
            </th>
          </thead>
          {this.displaySoundsTableRows(data)}
        </Table>
      </div>
    );
  }

  displaySoundsTableRows(data) {
    if (!data) {
      return <p>loading...</p>;
    }
    data = data[3];
    return data.map(data => StudentSoundsTableRows(data));
  }

  render() {
    return (
      <div>
        <div>{this.displaySoundsTableHead(this.props.data)}</div>
      </div>
    );
  }
}

export default StudentSoundsTableHead;
