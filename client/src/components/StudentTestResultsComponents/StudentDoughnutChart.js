import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Col } from "reactstrap";
class StudentDoughnutChart extends Component {
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    const divStyle = { height: "100px", align: "left" };

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
      <div style={divStyle}>
        <h3>Percentage of words learned</h3>
        <Doughnut data={data} />
      </div>
    );
  }
  d;
  render() {
    return <div>{this.displayChart(this.props)}</div>;
  }
}

export default StudentDoughnutChart;
