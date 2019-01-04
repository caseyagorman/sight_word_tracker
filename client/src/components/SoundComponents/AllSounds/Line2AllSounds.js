import React from "react";
import { Row, Col } from "react-bootstrap";
import SoundBarChart from "./SoundBarChart";

class Line2 extends React.Component {
  displayBarChart(sounds) {
    console.log("Line2 display bar chart", sounds.sounds[0]);
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
          <Col lg="4">{this.displayBarChart(this.props.sounds)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line2;
