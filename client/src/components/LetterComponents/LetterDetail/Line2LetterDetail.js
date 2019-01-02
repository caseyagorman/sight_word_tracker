import React from "react";
import { Row, Col } from "react-bootstrap";
import LetterDetailTableHead from "./LetterDetailTableHead";

class Line2 extends React.Component {
  displayTableHead(students, letter) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <LetterDetailTableHead students={students} letter={letter} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">
            {this.displayTableHead(this.props.students, this.props.letter)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
