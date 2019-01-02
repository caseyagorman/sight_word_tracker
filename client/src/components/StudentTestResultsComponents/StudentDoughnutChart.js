import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentDoughnutChart extends Component {
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }

    let learned = dataResults.dataResults.learned;
    console.log("learned", learned);
    let unlearned = dataResults.dataResults.unlearned;
    let tooltipData = [
      dataResults.dataResults.learned[1],
      dataResults.dataResults.unlearned[1]
    ];
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
          label: function(tooltipItem, data) {
            const indice = tooltipItem.index;
            return data.labels[indice] + ":" + tooltipData[indice];
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
