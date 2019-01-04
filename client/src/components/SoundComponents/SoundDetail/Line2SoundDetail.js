import React from "react";
import { Row, Col } from "react-bootstrap";
import WordDetailTableHead from "./SoundDetailTableHead";

class Line2 extends React.Component {
  displayTableHead(students, sound) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <WordDetailTableHead students={students} sound={sound} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">
            {this.displayTableHead(this.props.students, this.props.sound)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
