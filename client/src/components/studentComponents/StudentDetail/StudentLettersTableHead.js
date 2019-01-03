import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";
import StudentLettersTableRows from "./StudentLettersTableRows";

// Display table head of words students are learning

class StudentLettersTableHead extends Component {
  displayLettersTableHead(data) {
    console.log("display table head", data);
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <th>
              <h4>Letters</h4>
            </th>
          </thead>
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
