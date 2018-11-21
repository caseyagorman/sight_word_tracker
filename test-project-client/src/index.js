import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
const apiUrl = "http://localhost:5000/api/students";

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: null };
    axios.get(apiUrl).then(response => {
      this.setState({
        student: response.data
      });
    });
  }

  displayStudent(student) {
    if (!student) {
      return <p>Loading student...</p>;
    }
    return <div>{student.name}</div>;
  }

  render() {
    return (
      <div>
        <h1>{this.displayStudent(this.state.student)}</h1>
      </div>
    );
  }
}

ReactDOM.render(<Student />, document.getElementById("root"));

// axios.get();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
