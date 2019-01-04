import React from "react";
import { Row, Col } from "react-bootstrap";
const headerStyle = { fontSize: "100px" };
class Line1 extends React.Component {
  displaySound(word) {
    if (!word) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1 style={headerStyle}>{word.word}</h1>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displaySound(this.props.word)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
