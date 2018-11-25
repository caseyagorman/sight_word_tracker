import React, { Component } from "react";
import ViewStudents from "../components/ViewStudents";
import AddStudent from "../components/AddStudent";
import DeleteStudent from "../components/DeleteStudent";
import AddStudentWord from "../components/AddStudentWord";
class Students extends Component {
  render() {
    return (
      <div>
        <ViewStudents />
        <AddStudent />
        <DeleteStudent />
        <AddStudentWord />
      </div>
    );
  }
}

export default Students;
