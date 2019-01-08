import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../static/SoundStyle.css";
// Display table head of sounds sounds are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

class AllSoundsTableHead extends Component {
  constructor(props) {
    super(props);
    // this.state = { sounds: this.props.sounds };
    this.sortArray = this.sortArray.bind(this);
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
    // this.setState({ sounds: myArray });
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
    // let sounds = this.state.sounds;
    // console.log(
    //   "rendering AllSoundsTableHead",
    //   "this.state.sounds ==",
    //   this.state.sounds,
    //   "this.props",
    //   this.props
    // );
    let sounds = this.props.sounds;
    sounds = this.sortArray(sounds, this.state.sortKey, this.state.reverseSort);

    return (
      <div id="sound-table">
        <Table bordered hover>
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
                        <Link
                          to={`/sound-detail/${sound.sound_id}`}
                          className="link"
                        >
                          {sound.sound}
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
