import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Chart extends Component {
  state = { data: null };

  componentDidMount() {
    const data = {
      labels: ["Red", "Green", "Yellow"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    this.setState({ data: data });
  }

  render() {
    return (
      <div>
        <h2>Learned Words</h2>
        <Doughnut data={this.state.data} />
      </div>
    );
  }
}

export default Chart;
