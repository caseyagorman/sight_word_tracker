import React from "react";
import { Row, Col } from "react-bootstrap";
const headerStyle = { fontSize: "100px" };
class Line1 extends React.Component {
  displaySound(sound) {
    if (!sound) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h1 style={headerStyle}>{sound.sound}</h1>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displaySound(this.props.sound)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
