import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../static/LetterStyle.css";
// Display table head of letters letters are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

class AllLettersTableHead extends Component {
  constructor(props) {
    super(props);
    this.state = { letters: this.props.letters };
    this.onSort = this.onSort.bind(this);
  }

  onSort(e, sortKey) {
    let myArray = this.state.letters;
    myArray.sort(function(a, b) {
      return a[sortKey] < b[sortKey] ? 1 : a[sortKey] > b[sortKey] ? -1 : 0;
    });
    this.setState({ letters: myArray });
  }

  render() {
    let letters = this.state.letters;

    return (
      <div id="letter-table">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Letter</th>
              <th onClick={e => this.onSort(e, "count")}>Learned</th>
              <th onClick={e => this.onSort(e, "unlearned_count")}>Learning</th>
            </tr>
          </thead>
          <tbody>
            {letters.map(function(letter) {
              return (
                <tr>
                  <td>
                    <th>
                      <h1>
                        <Link
                          to={`/letter-detail/${letter.letter_id}`}
                          className="link"
                        >
                          {letter.letter}
                        </Link>
                      </h1>
                    </th>
                    <tr>
                      <td>
                        <h5>Learned |</h5> <span />
                        {letter.count}
                      </td>

                      <td>
                        <h5> Unlearned</h5>
                        {letter.unlearned_count}
                      </td>
                    </tr>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {letter.students.map(listElements)}
                    </ul>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {letter.unlearned_students.map(listElements)}
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

export default AllLettersTableHead;
