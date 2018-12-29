import React from "react";
import { Row, Col } from "react-bootstrap";
import WordDetailTableHead from "./WordDetailTableHead";

class Line2 extends React.Component {
  displayTableHead(students, word) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <WordDetailTableHead students={students} word={word} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">
            {this.displayTableHead(this.props.students, this.props.word)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
