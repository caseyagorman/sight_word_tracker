import React, { Component } from "react";
import { Table } from "reactstrap";
import StudentSoundsTableRows from "./StudentSoundsTableRows";

// Display table head of Sounds students are learning

class StudentSoundsTableHead extends Component {
  displaySoundsTableHead(data) {
    return (
      <div>
        <Table bordered hover>
          <thead id="student-sound-table-head">Sounds</thead>
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
    console.log("DATA", data[3]);
    return data.map(data => (
      <StudentSoundsTableRows key={data.sound_id} data={data} />
    ));
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
