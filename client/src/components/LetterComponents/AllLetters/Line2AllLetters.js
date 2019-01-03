import React from "react";
import { Row, Col } from "react-bootstrap";
import LetterBarChart from "./LetterBarChart";

class Line2 extends React.Component {
  componentDidMount() {
    console.log("props", this.props.letters);
  }
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
          <Col lg="4">{this.displayBarChart(this.props.letters)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
