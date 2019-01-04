import React from "react";
import { Link } from "react-router-dom";

// Display links to sounds

const AllSoundsTableRows = props => (
  <tbody>
    <tr>
      <td>
        <h4>
          <Link to={`/sound-detail/${props.sound_id}`}>{props.sound}</Link>
        </h4>
      </td>
      <td>{props.count}</td>
    </tr>
  </tbody>
);

export default AllSoundsTableRows;
