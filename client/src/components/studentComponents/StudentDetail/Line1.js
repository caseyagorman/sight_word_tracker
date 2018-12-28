import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentNamePage from "./StudentNamePage";

class Line1 extends Component {
  componetDidMount() {}

  studentNamePage(student) {
    if (!student) {
      return <p>Loading student...</p>;
    }
    return StudentNamePage(student);
  }

  render() {
    return (
      <div className="container">
        <div className="align-baseline">
          <Row>
            <Col className="align-top" lg="8">
              {this.studentNamePage(this.props.student)}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Line1;
