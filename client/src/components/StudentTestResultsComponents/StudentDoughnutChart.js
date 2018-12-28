import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Col } from "reactstrap";
class StudentDoughnutChart extends Component {
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    const divStyle = { height: "25px", align: "right" };

    let learned = dataResults.dataResults.learned;
    let unlearned = dataResults.dataResults.unlearned;
    const data = {
      labels: ["Learned Words", "Unlearned Words"],
      datasets: [
        {
          data: [learned, unlearned],
          backgroundColor: ["#229954", "#E74C3C"],
          hoverBackgroundColor: ["#229954", "#E74C3C"]
        }
      ]
    };
    return (
      <Col lg="6">
        <div style={divStyle}>
          <Doughnut data={data} />
        </div>
      </Col>
    );
  }
  d;
  render() {
    return <div>{this.displayChart(this.props)}</div>;
  }
}

export default StudentDoughnutChart;
