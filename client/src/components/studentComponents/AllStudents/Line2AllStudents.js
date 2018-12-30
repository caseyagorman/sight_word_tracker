import React from "react";
import DoughnutChart from "./DoughnutChart";
import { Row } from "react-bootstrap";

class Line2 extends React.Component {
  displayChart(user) {
    if (!user) {
      return <p>Loading...</p>;
    }
    return <DoughnutChart user={user} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          {/* <Col lg="6">{this.displayChart(this.props.user)}</Col> */}
        </Row>
      </div>
    );
  }
}

export default Line2;
