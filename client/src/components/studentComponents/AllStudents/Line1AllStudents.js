import React from "react";
import { Row, Col } from "react-bootstrap";
import AllStudentsTableHead from "./AllStudentsTableHead";

class Line1 extends React.Component {
  displayTableHead(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <AllStudentsTableHead students={students} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="8">{this.displayTableHead(this.props.students)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
