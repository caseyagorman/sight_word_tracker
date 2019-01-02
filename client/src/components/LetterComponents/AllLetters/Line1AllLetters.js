import React from "react";
import { Row, Col } from "reactstrap";
import AllLettersTableHead from "./AllLettersTableHead";

class Line1 extends React.Component {
  displayTableHead(letters) {
    if (!letters) {
      return <p>Loading...</p>;
    }
    return <AllLettersTableHead letters={letters.letters[0]} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.displayTableHead(this.props.letters)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
