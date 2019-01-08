import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentSoundDoughnutChart extends Component {
  formatArray(tooltipItem) {
    return " " + tooltipItem;
  }
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }

    const learnedCount = dataResults.dataResults.learned[0];
    const unlearnedCount = dataResults.dataResults.unlearned[0];

    let learnedSounds = dataResults.dataResults.learned[1].map(data =>
      this.formatArray(data)
    );
    let unlearnedSounds = dataResults.dataResults.unlearned[1].map(data =>
      this.formatArray(data)
    );
    let tooltipData = [learnedSounds, unlearnedSounds];
    const data = {
      labels: ["Learned sounds", "Unlearned sounds"],
      datasets: [
        {
          data: [learnedCount, unlearnedCount],
          backgroundColor: ["#008000", "#ff3333"],
          hoverBackgroundColor: ["#008000", "#ff3333"]
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
        <h3>Percentage of assigned sounds learned</h3>
        <Doughnut options={options} data={data} />
      </div>
    );
  }
  d;
  render() {
    return <div>{this.displayChart(this.props)}</div>;
  }
}

export default StudentSoundDoughnutChart;
