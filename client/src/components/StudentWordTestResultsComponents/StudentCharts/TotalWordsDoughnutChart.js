import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class TotalWordsDoughnutChart extends Component {
  formatArray(tooltipItem) {
    return " " + tooltipItem;
  }
  displayChart(dataResults) {
    console.log("dataResults", dataResults);
    if (!dataResults) {
      return <div> loading...</div>;
    }

    const learnedCount = dataResults.dataResults.learned;
    const unlearnedCount = dataResults.dataResults.unlearned;

    // let learnedwords = dataResults.dataResults.learned[1].map(data =>
    //   this.formatArray(data)
    // );
    // let unlearnedwords = dataResults.dataResults.unlearned[1].map(data =>
    //   this.formatArray(data)
    // );
    // let tooltipData = [learnedwords, unlearnedwords];
    const data = {
      labels: ["Learned words", "Unlearned words"],
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
        <h3>Percentage of all words learned</h3>
        <Doughnut options={options} data={data} />
      </div>
    );
  }
  d;
  render() {
    return <div>{this.displayChart(this.props)}</div>;
  }
}

export default TotalWordsDoughnutChart;
