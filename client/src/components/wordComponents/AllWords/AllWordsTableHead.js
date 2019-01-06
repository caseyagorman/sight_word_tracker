import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
// Display table head of words students are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

class AllWordsTableHead extends Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words };
    this.onSort = this.onSort.bind(this);
  }
  componentDidMount() {
    console.log("all words table", this.props);
  }
  onSort(e, sortKey) {
    let myArray = this.state.words;
    myArray.sort(function(a, b) {
      console.log("a", a[sortKey], "b", b[sortKey]);
      return a[sortKey] < b[sortKey] ? 1 : a[sortKey] > b[sortKey] ? -1 : 0;
    });
    this.setState({ words: myArray });
  }

  render() {
    let words = this.state.words;

    return (
      <div>
        <Table bordered hover striped>
          <thead>
            <tr>
              <th onClick={e => this.onSort(e, "word")}>Word</th>
              <th onClick={e => this.onSort(e, "count")}>Learned</th>
              <th onClick={e => this.onSort(e, "unlearned_count")}>Learning</th>
            </tr>
          </thead>
          <tbody>
            {words.map(function(word) {
              return (
                <tr>
                  <td>
                    <th>
                      <h1>
                        <Link to={`/word-detail/${word.word_id}`}>
                          {word.word}
                        </Link>
                      </h1>
                    </th>
                    <tr>
                      <td>
                        <h5>Learned |</h5> <span />
                        {word.count}
                      </td>

                      <td>
                        <h5> Unlearned</h5>
                        {word.unlearned_count}
                      </td>
                    </tr>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {word.students.map(listElements)}
                    </ul>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {word.unlearned_students.map(listElements)}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AllWordsTableHead;
