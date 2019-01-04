import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentWordDoughnutChart extends Component {
  formatArray(tooltipItem) {
    return " " + tooltipItem;
  }
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }

    const learnedCount = dataResults.dataResults.learned[0];
    const unlearnedCount = dataResults.dataResults.unlearned[0];

    let learnedWords = dataResults.dataResults.learned[1].map(data =>
      this.formatArray(data)
    );
    let unlearnedWords = dataResults.dataResults.unlearned[1].map(data =>
      this.formatArray(data)
    );
    let tooltipData = [learnedWords, unlearnedWords];
    const data = {
      labels: ["Learned Words", "Unlearned Words"],
      datasets: [
        {
          data: [learnedCount, unlearnedCount],
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

export default StudentWordDoughnutChart;
