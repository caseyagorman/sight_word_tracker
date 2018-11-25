import React, { Component } from "react";
import ViewStudents from "../components/ViewStudents";
import AddStudent from "../components/AddStudent";
import DeleteStudent from "../components/DeleteStudent";

class Students extends Component {
  render() {
    return (
      <div>
        <ViewStudents />
        <AddStudent />
        <DeleteStudent />
      </div>
    );
  }
}

export default Students;
