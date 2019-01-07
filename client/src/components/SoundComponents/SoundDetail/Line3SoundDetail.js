import React from "react";
import { Row, Col } from "react-bootstrap";
import AddStudentToSound from "../Forms/AddStudentToSound";

class Line3 extends React.Component {
  displayAddStudentsToSound(students, sound) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <AddStudentToSound students={students} sound={sound} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">
            {this.displayAddStudentsToSound(
              this.props.students,
              this.props.sound
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Line3;
