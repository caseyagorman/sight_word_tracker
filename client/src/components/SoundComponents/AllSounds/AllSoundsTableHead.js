import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
// Display table head of sounds sounds are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

class AllSoundsTableHead extends Component {
  constructor(props) {
    super(props);
    this.state = { sounds: this.props.sounds };
    this.onSort = this.onSort.bind(this);
  }
  componentDidMount() {
    console.log("all sounds table", this.props);
  }
  onSort(e, sortKey) {
    let myArray = this.state.sounds;
    myArray.sort(function(a, b) {
      console.log("a", a[sortKey], "b", b[sortKey]);
      return a[sortKey] < b[sortKey] ? 1 : a[sortKey] > b[sortKey] ? -1 : 0;
    });
    this.setState({ sounds: myArray });
  }

  render() {
    let sounds = this.state.sounds;

    return (
      <div>
        <Table bordered hover striped>
          <thead>
            <tr>
              <th onClick={e => this.onSort(e, "sound")}>Sound</th>
              <th onClick={e => this.onSort(e, "count")}>Learned</th>
              <th onClick={e => this.onSort(e, "unlearned_count")}>Learning</th>
            </tr>
          </thead>
          <tbody>
            {sounds.map(function(sound) {
              return (
                <tr>
                  <td>
                    <th>
                      <h1>
                        <Link to={`/sound-detail/${sound.sound_id}`}>
                          {sounds.sound}
                        </Link>
                      </h1>
                    </th>
                    <tr>
                      <td>
                        <h5>Learned |</h5> <span />
                        {sound.count}
                      </td>

                      <td>
                        <h5> Unlearned</h5>
                        {sound.unlearned_count}
                      </td>
                    </tr>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {sound.students.map(listElements)}
                    </ul>
                  </td>
                  <td>
                    <ul style={noBulletList}>
                      {sound.unlearned_students.map(listElements)}
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

export default AllSoundsTableHead;
