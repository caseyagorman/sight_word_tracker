import React from "react";
import { Link } from "react-router-dom";

const AddSoundButton = props => {
  return (
    <Link to={`/add-sound`}>
      <button className="btn btn-primary btn-lg">Add Sound</button>
    </Link>
  );
};

export default AddSoundButton;
