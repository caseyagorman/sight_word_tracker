import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import "../../static/SoundStyle.css";
// Display table head of sounds sounds are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

// Expected props:
// tableData: [{}]
// renderTable: fn
class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.sortArray = this.sortArray.bind(this);
    this.onSort = this.onSort.bind(this);
    this.state = {
      sortKey: undefined,
      reverseSort: false
    };
  }

  sortArray(array, sortKey, reverseSort) {
    array = array.slice();
    if (sortKey) {
      array.sort(function(a, b) {
        return a[sortKey] < b[sortKey] ? 1 : a[sortKey] > b[sortKey] ? -1 : 0;
      });
    }
    if (reverseSort) {
      array.reverse();
    }
    return array;
  }

  onSort(e, sortKey) {
    // TODO: Set state using Object.assign, etc
    // If we clicked the column that we're already using to sort the table,
    // reverse the order.
    const newReverseSort =
      sortKey === this.state.sortKey
        ? !this.state.reverseSort
        : this.state.reverseSort;
    this.setState({
      sortKey: sortKey,
      reverseSort: newReverseSort
    });
  }

  render() {
    let token = this.props.token;
    let tableElements = this.sortArray(
      this.props.tableElements,
      this.state.sortKey,
      this.state.reverseSort
    );

    return this.props.renderTable(tableElements, this.onSort, token);
  }
}

export default TableContainer;
