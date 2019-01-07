import React from "react";
import { Link } from "react-router-dom";

const AddSoundButton = props => {
  return (
    <Link to={`/add-sound`}>
      <button id="add-sound-button">Add Sound</button>
    </Link>
  );
};

export default AddSoundButton;
