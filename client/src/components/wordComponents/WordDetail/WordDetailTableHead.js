import React, { Component } from "react";
import { Table } from "reactstrap";
import WordDetailTableRows from "./WordDetailTableRows";

// Display table head of words students are learning

class WordDetailTableHead extends Component {
  displayTableHead(students, word) {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>
                <h4>These students are learning "{word.word}"</h4>
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

    return students.map(students => WordDetailTableRows(students));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.students, this.props.word)}</div>
      </div>
    );
  }
}

export default WordDetailTableHead;
