import React from "react";
import { Row, Col } from "react-bootstrap";
import SoundBarChart from "./SoundBarChart";

class Line2 extends React.Component {
  displayBarChart(sounds) {
    if (!sounds) {
      return <p>Loading...</p>;
    }
    sounds = sounds.sounds[0];
    return <SoundBarChart data={sounds} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">{this.displayBarChart(this.props.sounds)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
