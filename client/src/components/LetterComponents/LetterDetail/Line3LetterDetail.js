import React from "react";
import { Row, Col } from "react-bootstrap";
import AddStudentToLetter from "../Forms/AddStudentToLetter";

class Line3 extends React.Component {
  displayAddStudentsToLetter(students, letter) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <AddStudentToLetter students={students} letter={letter} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">
            {this.displayAddStudentsToLetter(
              this.props.students,
              this.props.letter
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Line3;
