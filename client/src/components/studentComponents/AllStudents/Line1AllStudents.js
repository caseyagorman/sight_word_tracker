import React from "react";
import { Row, Col } from "react-bootstrap";
import AllStudentsTableHead from "./AllStudentsTableHead";

class Line1 extends React.Component {
  componentDidMount() {
    console.log("line2 all students props", this.props);
  }
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
          <Col lg="4">{this.displayTableHead(this.props.students)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
