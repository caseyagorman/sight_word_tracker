import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../../static/WordStyle.css";

class Line1 extends React.Component {
  displayWord(word) {
    if (!word) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1 id="display-word">{word.word}</h1>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displayWord(this.props.word)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
