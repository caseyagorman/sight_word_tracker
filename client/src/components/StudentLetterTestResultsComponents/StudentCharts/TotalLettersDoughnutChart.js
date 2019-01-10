import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class TotalLettersDoughnutChart extends Component {
  formatArray(tooltipItem) {
    return " " + tooltipItem;
  }
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }

    const learnedCount = dataResults.dataResults.learned;
    const unlearnedCount = dataResults.dataResults.unlearned;

    // let learnedletters = dataResults.dataResults.learned[1].map(data =>
    //   this.formatArray(data)
    // );
    // let unlearnedletters = dataResults.dataResults.unlearned[1].map(data =>
    //   this.formatArray(data)
    // );
    // let tooltipData = [learnedletters, unlearnedletters];
    const data = {
      labels: ["Learned letters", "Unlearned letters"],
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
        // callbacks: {
        //   label: function(tooltipItem, data) {
        //     const indice = tooltipItem.index;
        //     return data.labels[indice] + ":" + tooltipData[indice];
        //   }
        // }
      }
    };
    return (
      <div>
        <h3>Percentage of all letters learned</h3>
        <Doughnut options={options} data={data} />
      </div>
    );
  }
  d;
  render() {
    return <div>{this.displayChart(this.props)}</div>;
  }
}

export default TotalLettersDoughnutChart;
