import React, { Component } from "react";
import { Table } from "reactstrap";
import LetterDetailTableRows from "./LetterDetailTableRows";

// Display table head of letters students are learning

class LetterDetailTableHead extends Component {
  displayTableHead(students, letter) {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>
                <h4>These students are learning "{letter.letter}"</h4>
              </th>
            </tr>
          </thead>
          {this.displayTableRows(students)}
        </Table>
      </div>
    );
  }

  displayTableRows(students) {
    if (!students) {
      return <p>loading...</p>;
    }

    return students.map(students => LetterDetailTableRows(students));
  }

  render() {
    return (
      <div>
        <div>
          {this.displayTableHead(this.props.students, this.props.letter)}
        </div>
      </div>
    );
  }
}

export default LetterDetailTableHead;
