import React, { Component } from "react";
import ViewWords from "../components/ViewWords";
import AddWord from "../components/AddWord";
import DeleteWord from "../components/DeleteWord";

class Words extends Component {
  render() {
    return (
      <div>
        <ViewWords />
        <AddWord />
        <DeleteWord />
      </div>
    );
  }
}

export default Words;
