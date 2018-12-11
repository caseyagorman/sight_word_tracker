import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Chart extends Component {
  state = { data: null };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }

    let correct_count = this.state.data.correct_count;
    let incorrect_count = this.state.data.incorrect_count;
    const data = {
      labels: ["Learned Words", "Unlearned Words"],
      datasets: [
        {
          data: [correct_count, incorrect_count],
          backgroundColor: ["#36A2EB", "#FF6384"],
          hoverBackgroundColor: ["#36A2EB", "#FF6384"]
        }
      ]
    };
    return <Doughnut data={data} />;
  }

  render() {
    return (
      <div>
        <h2>Learned Words</h2>
        {this.displayChart(this.state.data)}
      </div>
    );
  }
}

export default Chart;
