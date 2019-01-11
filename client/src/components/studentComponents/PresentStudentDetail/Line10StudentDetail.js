import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AddWordButton from "../../WordComponents/Forms/AddWordButton";
import AddLetterButton from "../../LetterComponents/Forms/AddLetterButton";
import AddSoundButton from "../../SoundComponents/Forms/AddSoundButton";
import "../../../static/StudentStyle.css";
class Line9 extends Component {
  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="4">
            <div id="add-item-button-student-detail">
              <AddWordButton id="add-item-button-student-detail" />
            </div>
          </Col>
          <Col lg="4">
            <div id="add-item-button-student-detail">
              <AddLetterButton id="add-item-button-student-detail" />
            </div>
          </Col>
          <Col lg="4">
            <div id="add-item-button-student-detail">
              <AddSoundButton id="add-item-button-student-detail" />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line9;
