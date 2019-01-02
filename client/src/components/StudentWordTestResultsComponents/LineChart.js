import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  getChartData(data) {
    if (!data) {
      return <div>loading...</div>;
    }
    let dates = [];
    let scores = [];
    for (let i = 0; i < data.length; i++) {
      scores.push(data[i].score);
      dates.push(data[i].test_date);
    }
    return this.displayChartData(dates, scores);
  }

  displayChartData(dates, scores) {
    const data = {
      labels: dates,
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: scores
        }
      ]
    };

    return (
      <div>
        <h3>Student tests over time</h3>
        <Line data={data} />
      </div>
    );
  }

  render() {
    return <div>{this.getChartData(this.props.tests)}</div>;
  }
}

export default LineChart;
