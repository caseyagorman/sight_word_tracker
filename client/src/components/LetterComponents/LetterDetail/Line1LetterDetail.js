import React from "react";
import { Row, Col } from "react-bootstrap";
const headerStyle = { fontSize: "100px" };
class Line1 extends React.Component {
  displayLetter(letter) {
    if (!letter) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1 style={headerStyle}>{letter.letter}</h1>
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
