import React from "react";
import { Row, Col } from "react-bootstrap";
import AllWordsTableHead from "./AllWordsTableHead";

class Line1 extends React.Component {
  componentDidMount() {
    console.log("line1 all words props", this.props);
  }
  displayTableHead(words) {
    console.log("Line1 display table head", words.words[0]);
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
