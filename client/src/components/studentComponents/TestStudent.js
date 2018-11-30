import React from "react";
import axios from "axios";
import StudentPage from "./StudentPage";
import StudentWordTestPage from "./StudentWordTestPage";
class TestStudent extends React.Component {
  state = {
    student: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/api/details/${id}`).then(student => {
      this.setState(() => ({ student }));
    });
  }

  render() {
    return (
      <div>
        <br />
        <div>
          <StudentWordTestPage {...this.state} />{" "}
        </div>
      </div>
    );
  }
}

export default TestStudent;
