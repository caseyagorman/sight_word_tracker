import React from "react";
import { Row, Col } from "react-bootstrap";
// import AllSoundsTableHead from "./AllSoundsTableHead";
import TableContainer from "../../TableContainer/TableContainer";
import LettersTableComponent from "../../TableContainer/LettersTableComponent";

class Line1 extends React.Component {
  displayLowercaseLettersTable(letters) {
    console.log("props1", this.props);
    if (!letters) {
      return <p>Loading...</p>;
    }
    return (
      <TableContainer
        renderTable={LettersTableComponent}
        tableElements={letters}
        token={this.props.token}
      />
    );
  }

  displayCapitalLettersTable(letters) {
    if (!letters) {
      return <p>Loading...</p>;
    }
    return (
      <TableContainer
        renderTable={LettersTableComponent}
        tableElements={letters}
        token={this.props.token}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="8">
            {this.displayCapitalLettersTable(this.props.letters.letters[1])}
          </Col>
        </Row>
        <Row>
          <Col lg="8">
            {this.displayLowercaseLettersTable(this.props.letters.letters[0])}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
