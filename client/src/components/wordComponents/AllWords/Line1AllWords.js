import React from "react";
import { Row, Col } from "react-bootstrap";
import TableContainer from "../../TableContainer/TableContainer";
import WordsTableComponent from "../../TableContainer/WordsTableComponent";
// import "../../../static/WordStyle.css";
class Line1 extends React.Component {
  displayTableHead(words) {
    if (!words) {
      return <p>Loading...</p>;
    }
    return (
      <TableContainer
        renderTable={WordsTableComponent}
        tableElements={words.words}
        token={this.props.token}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="8">{this.displayTableHead(this.props.words)}</Col>
        </Row>
      </div>
    );
  }
}

export default Line1;
