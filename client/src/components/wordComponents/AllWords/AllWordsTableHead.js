import React, { Component } from "react";
import { Table } from "reactstrap";
import AllWordsTableRows from "./AllWordsTableRows";

// Display table head of words words are learning

class AllWordsTableHead extends Component {
  displayTableHead(words) {
    console.log("display table head", words);
    return (
      <div>
        <Table striped bordered condensed hover>
          {this.displayTableRows(words)}
        </Table>
      </div>
    );
  }

  displayTableRows(words) {
    console.log("display table rows", words);
    if (!words) {
      return <p>loading...</p>;
    }

    return words.map(words => AllWordsTableRows(words));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.words)}</div>
      </div>
    );
  }
}

export default AllWordsTableHead;
