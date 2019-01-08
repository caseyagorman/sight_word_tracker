import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
// import "../../../static/StudentStyle.css";
// Display table head of words students are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

const SoundsTableComponent = (sounds, onSort) => (
  <div id="sound-table">
    <Table bordered hover>
      <thead>
        <tr>
          <th onClick={e => onSort(e, "sound")}>Sound</th>
          <th onClick={e => onSort(e, "count")}>Learned</th>
          <th onClick={e => onSort(e, "unlearned_count")}>Learning</th>
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
                <ul style={noBulletList}>{sound.students.map(listElements)}</ul>
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

export default SoundsTableComponent;
