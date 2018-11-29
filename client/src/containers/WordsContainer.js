import React, { Component } from "react";
import ViewWords from "../components/wordComponents/ViewWords";
import AddWord from "../components/wordComponents/AddWord";
import DeleteWord from "../components/wordComponents/DeleteWord";

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
