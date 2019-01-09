import React from "react";
import { Row, Col } from "react-bootstrap";
import AllSoundsTableHead from "./AllSoundsTableHead";
import TableContainer from "../../TableContainer/TableContainer";
import SoundsTableComponent from "../../TableContainer/SoundsTableComponent";

class Line1 extends React.Component {
  displayTableHead(sounds) {
    if (!sounds) {
      return <p>Loading...</p>;
    }
    return (
      <TableContainer
        renderTable={SoundsTableComponent}
        tableElements={sounds}
        token={this.props.token}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="8">{this.displayTableHead(this.props.sounds.sounds)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
