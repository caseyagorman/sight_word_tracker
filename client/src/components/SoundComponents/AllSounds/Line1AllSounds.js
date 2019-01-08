import React from "react";
import { Row, Col } from "react-bootstrap";
import AllSoundsTableHead from "./AllSoundsTableHead";

class Line1 extends React.Component {
  displayTableHead(sounds) {
    if (!sounds) {
      return <p>Loading...</p>;
    }
    return <AllSoundsTableHead sounds={sounds.sounds} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">{this.displayTableHead(this.props.sounds)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
