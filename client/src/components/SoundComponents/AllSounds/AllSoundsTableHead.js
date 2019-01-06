import React, { Component } from "react";
import { Table } from "reactstrap";
import AllSoundsTableRows from "./AllSoundsTableRows";

// Display table head of sounds sounds are learning

class AllSoundsTableHead extends Component {
  displayTableHead(sounds) {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <th>
              <h4>Sound</h4>
            </th>
            <th>
              <h4>Learned</h4>
            </th>
            <th>
              <h4>Learning</h4>
            </th>
          </thead>
          {this.displayTableRows(sounds)}
        </Table>
      </div>
    );
  }

  displayTableRows(sounds) {
    if (!sounds) {
      return <p>loading...</p>;
    }

    return sounds.map(sounds => AllSoundsTableRows(sounds));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.sounds)}</div>
      </div>
    );
  }
}

export default AllSoundsTableHead;
