import React from "react";
import { Row, Col } from "react-bootstrap";
import WordBarChart from "./WordBarChart";

class Line2 extends React.Component {
  displayBarChart(words) {
    console.log("Line2 display bar chart", words.words[0]);
    if (!words) {
      return <p>Loading...</p>;
    }
    words = words.words[0];
    return <WordBarChart data={words} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displayBarChart(this.props.words)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
