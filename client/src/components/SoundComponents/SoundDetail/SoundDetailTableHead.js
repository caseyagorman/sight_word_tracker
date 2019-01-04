import React, { Component } from "react";
import { Table } from "reactstrap";
import SoundDetailTableRows from "./SoundDetailTableRows";

// Display table head of sounds students are learning

class SoundDetailTableHead extends Component {
  displayTableHead(students, sound) {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>
                <h4>These students are learning "{sound.sound}"</h4>
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

    return students.map(students => SoundDetailTableRows(students));
  }

  render() {
    return (
      <div>
        <div>
          {this.displayTableHead(this.props.students, this.props.sound)}
        </div>
      </div>
    );
  }
}

export default SoundDetailTableHead;
