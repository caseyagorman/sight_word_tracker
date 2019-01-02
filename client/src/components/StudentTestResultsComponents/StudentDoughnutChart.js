import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentDoughnutChart extends Component {
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }

    let learned = dataResults.dataResults.learned;
    let unlearned = dataResults.dataResults.unlearned;
    const data = {
      labels: ["Learned Words", "Unlearned Words"],
      datasets: [
        {
          data: [learned[0], unlearned[0]],
          backgroundColor: ["#229954", "#E74C3C"],
          hoverBackgroundColor: ["#229954", "#E74C3C"]
        }
      ]
    };
    let options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return [learned[1], unlearned[1]];
          }
        }
      }
    };
    return (
      <div>
        <h3>Percentage of words learned</h3>
        <Doughnut options={options} data={data} />
      </div>
    );
  }
  d;
  render() {
    return <div>{this.displayChart(this.props)}</div>;
  }
}

export default StudentDoughnutChart;
