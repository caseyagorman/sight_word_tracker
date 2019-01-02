import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentDoughnutChart extends Component {
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    console.log("student doughnut chart", dataResults);
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
      <div>
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
