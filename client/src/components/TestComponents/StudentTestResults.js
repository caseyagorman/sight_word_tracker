import React, { Component } from "react";
import axios from "axios";

class StudentTestResult extends Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
    this.getStudentTestResults = this.getStudentTestResults.bind(this);
  }
  componentDidMount() {
    console.log("props", this.props);
    const id = this.props.id;
    this.setState({ id: id });
  }

  getStudentTestResults(id) {
    console.log(this.props);
    console.log(this.props.id);
    if (!id) {
      return <div>loading</div>;
    }
    console.log(this.props.id);
    console.log(this.state.id);
    return <div>Yay!</div>;
  }
  // async getStudentTestResults(id) {
  //   if (!id) {
  //     return <div>loading...</div>;
  //   }
  //   try {
  //     let d = await axios.get(
  //       `http://localhost:5000/api/get-student-test/${id}`
  //     );
  //     console.log(d);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  render() {
    return <div>{this.getStudentTestResults(this.state.id)}</div>;
  }
}

export default StudentTestResult;
