import React from "react";
import { Row, Col } from "react-bootstrap";
import LetterBarChart from "./LetterBarChart";

class Line2 extends React.Component {
  displayBarChart(letters) {
    if (!letters) {
      return <p>Loading...</p>;
    }
    return <LetterBarChart data={letters} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">{this.displayBarChart(this.props.letters)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
