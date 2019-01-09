import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../../static/LetterStyle.css";
import DeleteLetter from "../Forms/DeleteLetter";
class Line1 extends React.Component {
  displayLetter(letter) {
    if (!letter) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <b id="display-letter">{letter.letter}</b>
        <DeleteLetter letterAlt={letter} token={this.props.token} />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displayLetter(this.props.letter)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
