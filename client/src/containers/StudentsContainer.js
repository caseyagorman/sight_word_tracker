import React, { Component } from "react";
import ViewStudents from "../components/ViewStudents";
import DeleteStudent from "../components/DeleteStudent";
import AddStudentWordForm from "../components/AddStudentWordForm";
class Students extends Component {
  render() {
    return (
      <div>
        <ViewStudents />
      </div>
    );
  }
}

export default Students;
