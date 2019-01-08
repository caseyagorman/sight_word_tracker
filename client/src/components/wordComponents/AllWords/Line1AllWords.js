import React from "react";
import { Row, Col } from "react-bootstrap";
import AllWordsTableHead from "./AllWordsTableHead";
import "../../../static/WordStyle.css";
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
          <Col lg="8">{this.displayTableHead(this.props.words)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
