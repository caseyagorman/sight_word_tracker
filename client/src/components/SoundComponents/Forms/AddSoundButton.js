import React from "react";
import { Link } from "react-router-dom";

const AddSoundButton = props => {
  return (
    <Link to={`/add-sound`}>
      <button className="add-sound-button">Add Sounds</button>
    </Link>
  );
};

export default AddSoundButton;
