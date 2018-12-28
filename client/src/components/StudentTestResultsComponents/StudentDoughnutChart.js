import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentDoughnutChart extends Component {
  displayChart(dataResults) {
    console.log("student doughnutchart", dataResults, dataResults.data);
    if (!dataResults) {
      return <div> loading...</div>;
    }
    const divStyle = { height: "25px", align: "center" };

    let learned = dataResults.data.learned;
    console.log("learned", learned);
    let unlearned = dataResults.data.unlearned;
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
        <h2>Learned Words</h2>
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
