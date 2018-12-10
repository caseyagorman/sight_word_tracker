import React from "react";
import axios from "axios";
import ViewStudentTestResults from "./ViewStudentTestResults";
class StudentTestResults extends React.Component {
  state = {
    test: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    try {
      let d = await axios
        .get(`http://localhost:5000/api/get-student-test/${id}`)
        .then(test => {
          this.setState({ test: test });
        });
      console.log(d);
    } catch (e) {
      console.log(e);
    }
  }

  viewStudentTestResults(test) {
    if (!test) {
      return <p>loading...</p>;
    }
    return ViewStudentTestResults(test);
  }
  render() {
    return (
      <div>
        <div>hello</div>
        <div>{this.viewStudentTestResults(this.state.test)}</div>
      </div>
    );
  }
}

export default StudentTestResults;
