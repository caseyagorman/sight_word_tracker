import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AddStudentToWord from "../Forms/AddStudentToWord";

class Line4 extends Component {
  addStudentToWord(word) {
    console.log("student", word);
    if (!word) {
      return <div>loading...</div>;
    }
    return <AddStudentToWord word={word} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.addStudentToWord(this.props.word)}</Col>
        </Row>
      </div>
    );
  }
}
export default Line4;
