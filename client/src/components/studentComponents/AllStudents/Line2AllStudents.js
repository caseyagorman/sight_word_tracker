import React from "react";
import { Row, Col } from "react-bootstrap";
import AllStudentsTableHead from "./AllStudentsTableHead";

class Line2 extends React.Component {
  componentDidMount() {
    console.log("line2 all students props", this.props);
  }
  displayTableHead(students) {
    console.log("Line2", students);
    if (!students) {
      return <p>Loading...</p>;
    }
    return <AllStudentsTableHead students={students} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displayTableHead(this.props.students)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
