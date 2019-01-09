import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import DeleteSound from "../SoundComponents/Forms/DeleteSound";
import "../../static/SoundStyle.css";
// Display table head of words students are learning
const noBulletList = { listStyleType: "none" };
const listElements = el => <li>{el}</li>;

const SoundsTableComponent = (sounds, onSort, token) => (
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
                <Link to={`/sound-detail/${sound.sound_id}`} className="link">
                  <h2 id="sound-table-head">{sound.sound}</h2>
                </Link>
                <DeleteSound token={token} soundAlt={sound} />
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
        <tr>
          <td colspan="8">
            <a href="/add-sound" className="link">
              + Click to add new sound
            </a>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default SoundsTableComponent;
