import React from "react";
import { Row, Col } from "react-bootstrap";
import AllWordsTableHead from "./AllWordsTableHead";

class Line1 extends React.Component {
  displayTableHead(words) {
    if (!words) {
      return <p>Loading...</p>;
    }
    return <AllWordsTableHead words={words.words[0]} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displayTableHead(this.props.words)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
