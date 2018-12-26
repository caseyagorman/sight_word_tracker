import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudentWordsPage from "./StudentWordsPage";

class DisplayStudentWords extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  displayTableHead(words, student) {
    console.log("displayTableHead", words, student);
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>{this.props.student.fname} is learning</th>
          </tr>
        </thead>
        {this.displayTableRows(words)}
      </Table>
    );
  }

  displayTableRows(words) {
    console.log("display table rows", words);
    if (!words) {
      return <p>loading...</p>;
    }

    return words.map(words => StudentWordsPage(words));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.words, this.props.student)}</div>
      </div>
    );
  }
}

export default DisplayStudentWords;
