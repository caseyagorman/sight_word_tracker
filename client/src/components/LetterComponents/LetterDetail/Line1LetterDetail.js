import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../../static/LetterStyle.css";
class Line1 extends React.Component {
  displayLetter(letter) {
    if (!letter) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1 id="display-letter">{letter.letter}</h1>
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
