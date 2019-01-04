import React, { Component } from "react";
import { Table } from "reactstrap";
import SoundCountRows from "./SoundCountRows";
class StudentSoundCountsTableHead extends Component {
  displayTableHead(test) {
    return (
      <div>
        <h3> Sound Counts</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Sound</th>
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

    return test.map(test => SoundCountRows(test));
  }

  render() {
    return <div>{this.displayTableHead(this.props.test)}</div>;
  }
}

export default StudentSoundCountsTableHead;
