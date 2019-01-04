import React from "react";
import StudentWordBarChart from "./StudentWordBarChart";
import StudentLetterBarChart from "./StudentLetterBarChart";
import StudentSoundBarChart from "./StudentSoundBarChart";
import { Row, Col } from "react-bootstrap";

class Line2 extends React.Component {
  displayWordBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    console.log("Line2", students);
    return <StudentWordBarChart students={students} />;
  }
  displayLetterBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentLetterBarChart students={students} />;
  }

  displaySoundBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentSoundBarChart students={students} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="8">{this.displayWordBarChart(this.props.students)}</Col>
        </Row>
        <Row>
          <Col lg="8">{this.displayLetterBarChart(this.props.students)}</Col>
        </Row>
        <Row>
          <Col lg="8">{this.displaySoundBarChart(this.props.students)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
